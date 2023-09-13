import { StatusCodes } from 'http-status-codes';
import cloudinary from 'cloudinary';
import { formatImage } from '../middleware/multerMiddleware.js';

import UserModel from '../models/UserModel.js';
import JobModel from '../models/JobModel.js';

export const getCurrentUser = async (req, res) => {
	const passUser = await UserModel.findOne({ _id: req.user.userId });
	const user = passUser.toJSON();
	res.status(StatusCodes.OK).json({ user });
};

export const getApplicationStatus = async (req, res) => {
	const users = await UserModel.countDocuments();
	const jobs = await JobModel.countDocuments();
	res.status(StatusCodes.OK).json({ users: users, jobs: jobs });
};

export const updateUser = async (req, res) => {
	const newUser = { ...req.body };
	delete newUser.password;

	if (req.file) {
		const file = formatImage(req.file);
		const response = await cloudinary.v2.uploader.upload(file);
		newUser.avatar = response.secure_url;
		newUser.avatarPublicId = response.public_id;
	}
	const updatedUser = await UserModel.findByIdAndUpdate(
		req.user.userId,
		newUser
	);
	if (req.file && updatedUser.avatarPublicId) {
		await cloudinary.v2.uploader.destroy(updatedUser.avatarPublicId);
	}

	res.status(StatusCodes.OK).json({ msg: 'update user' });
};
