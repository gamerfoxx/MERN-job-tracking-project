import 'express-async-errors';

import JobModel from '../models/JobModel.js';

export const getAllJobs = async (req, res) => {
	//find can be used to find certain entries with a specific value based on the schema
	const jobs = await JobModel.find({});
	res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
	const job = await JobModel.create(req.body);
	res.status(201).json({ job });
};

export const getOneJob = async (req, res) => {
	const { id } = req.params;
	const job = await JobModel.findById(id);

	if (!job) {
		throw new Error('no job with that ID');
	}
	res.status(200).json({ job });
};

export const editJob = async (req, res) => {
	const { id } = req.params;
	const updatedJob = await JobModel.findByIdAndUpdate(id, req.body, {
		new: true,
	});

	if (!updatedJob) {
		res.status(404).json({ msg: 'Please provide valid ID' });
		return;
	}

	res.status(200).json({ msg: 'job modified', job: updatedJob });
};

export const deleteJob = async (req, res) => {
	const { id } = req.params;
	const removedJob = await JobModel.findByIdAndDelete(id);
	if (!job) {
		res.status(404).json({ msg: 'Please provide valid ID' });
		return;
	}
	res.status(200).json({ msg: 'job deleted', job: removedJob });
};
