import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';

import JobModel from '../models/JobModel.js';

export const getAllJobs = async (req, res) => {
	//find can be used to find certain entries with a specific value based on the schema
	const jobs = await JobModel.find({ createdBy: req.user.userId });
	res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
	req.body.createdBy = req.user.userId;
	const job = await JobModel.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

export const getOneJob = async (req, res) => {
	const job = await JobModel.findById(req.params.id);

	res.status(StatusCodes.OK).json({ job });
};

export const editJob = async (req, res) => {
	const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
	const removedJob = await JobModel.findByIdAndDelete(req.params.id);

	res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};
