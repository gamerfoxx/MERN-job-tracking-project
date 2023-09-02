import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';
import { createJWT } from '../utils/tokenUtils.js';

export const register = async (req, res) => {
	const firstAccount = (await UserModel.countDocuments()) === 0;
	req.body.role = firstAccount ? 'admin' : 'user';
	const hashedPass = await hashPassword(req.body.password);
	req.body.password = hashedPass;

	const user = await UserModel.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: 'User Created' });
};
export const login = async (req, res) => {
	const user = await UserModel.findOne({ email: req.body.email });
	const isValid =
		user && (await comparePassword(req.body.password, user.password));

	if (!isValid) throw new UnauthenticatedError('invalid creds');

	const token = createJWT({ userId: user._id, role: user.role });

	const expires = 1000 * 60 * 60 * 24; //one day

	res.cookie('token', token, {
		httpOnly: true,
		expires: new Date(Date.now() + expires),
		secure: process.env.NODE_ENV === 'production',
	});
	res.status(StatusCodes.OK).json({ msg: 'user logged in' });
};

export const logout = (req, res) => {
	res.cookie('token', 'logout', {
		httpOnly: true,
		expires: new Date(Date.now()),
	});
	res.status(StatusCodes.OK).json({ msg: 'user logged out' });
};
