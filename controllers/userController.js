import { StatusCodes } from 'http-status-codes';

import UserModel from '../models/UserModel.js';
import JobModel from '../models/JobModel.js';

export const getCurrentUser = async (req, res) => {
	const user = await UserModel.findOne({ _id: req.user.userId });
	const updatedUser = user.toJSON();
	res.status(StatusCodes.OK).json({ updatedUser });
};

export const getApplicationStatus = async (req, res) => {
	const users = await UserModel.countDocuments();
	const jobs = await JobModel.countDocuments();
	res.status(StatusCodes.OK).json({ users: users, jobs: jobs });
};

export const updateUser = async (req, res) => {
	const obj = { ...req.body };
	delete obj.password;
	const updatedUser = await UserModel.findByIdAndUpdate(req.user.userId, obj);
	res.status(StatusCodes.OK).json({ msg: 'update user' });
};
