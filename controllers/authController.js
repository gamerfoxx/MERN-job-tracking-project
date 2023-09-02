import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';
import { hashPassword } from '../utils/passUtils.js';

export const register = async (req, res) => {
	const firstAccount = (await UserModel.countDocuments()) === 0;
	req.body.role = firstAccount ? 'admin' : 'user';
	const hashedPass = await hashPassword(req.body.password);
	req.body.password = hashedPass;

	const user = await UserModel.create(req.body);
	res.status(StatusCodes.CREATED).json({ msg: 'User Created' });
};
export const login = async (req, res) => {
	res.send('login');
};
