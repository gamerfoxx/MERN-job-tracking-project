import { UnauthenticatedError } from '../errors/customErrors.js';
import { verifyJWT } from '../utils/tokenUtils.js';

export const authenticateUser = async (req, res, next) => {
	const { token } = req.cookies;

	try {
		const { userId, role } = verifyJWT(token);
		req.user = { userId, role };
		next();
	} catch (err) {
		throw new UnauthenticatedError('authentication invalid');
	}
};
