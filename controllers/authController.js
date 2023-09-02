import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';
import { comparePassword, hashPassword } from '../utils/passUtils.js';
import { UnauthenticatedError } from '../errors/customErrors.js';

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

	res.send('login');
};
