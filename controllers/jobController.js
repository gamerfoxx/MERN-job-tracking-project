import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';

import JobModel from '../models/JobModel.js';
import { NotFoundError } from '../errors/customErrors.js';

export const getAllJobs = async (req, res) => {
	//find can be used to find certain entries with a specific value based on the schema
	const jobs = await JobModel.find({});
	res.status(StatusCodes.OK).json({ jobs });
};

export const createJob = async (req, res) => {
	const job = await JobModel.create(req.body);
	res.status(StatusCodes.CREATED).json({ job });
};

export const getOneJob = async (req, res) => {
	const { id } = req.params;
	const job = await JobModel.findById(id);

	if (!job) throw new NotFoundError(`No job with ID ${id}`);

	res.status(StatusCodes.OK).json({ job });
};

export const editJob = async (req, res) => {
	const { id } = req.params;
	const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	if (!updatedJob) throw new NotFoundError(`Please provide valid ID`);

	res.status(StatusCodes.OK).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
	const { id } = req.params;
	const removedJob = await JobModel.findByIdAndDelete(id);
	if (!job) throw new NotFoundError(`Please provide valid ID`);
	res.status(StatusCodes.OK).json({ msg: 'job deleted', job: removedJob });
};
