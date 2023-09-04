import {
	UnauthenticatedError,
	UnauthorizedError,
	BadRequestError,
} from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
	const { token } = req.cookies;

	try {
		const { userId, role } = verifyJWT(token);
		const testUser = userId === '64f64ec9c4800941680b657b';
		req.user = { userId, role, testUser };
		next();
	} catch (err) {
		throw new UnauthenticatedError('authentication invalid');
	}
};

export const authorizePermissions = (...roles) => {
	return (req, res, next) => {
		console.log(roles);
		if (!roles.includes(req.user.role)) {
			throw new UnauthorizedError('Unauthorized to access');
		}

		next();
	};
};

export const checkForTest = (req, res, next) => {
	if (req.user.testUser) throw new BadRequestError('Demo user, read only');
	next();
};
