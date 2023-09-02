import { StatusCodes } from 'http-status-codes';
import UserModel from '../models/UserModel.js';

export const register = async (req, res) => {
	const firstAccount = (await UserModel.countDocuments()) === 0;
	req.body.role = firstAccount ? 'admin' : 'user';
	const user = await UserModel.create(req.body);
	res.status(StatusCodes.CREATED).json({ user });
};
export const login = async (req, res) => {
	res.send('login');
};
