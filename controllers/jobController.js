import JobModel from '../models/JobModel.js';

import { nanoid } from 'nanoid';

let jobs = [
	{ id: nanoid(), company: 'google', position: 'frontend' },
	{ id: nanoid(), company: 'apple', position: 'frontend' },
	{ id: nanoid(), company: 'android', position: 'frontend' },
];

export const getAllJobs = async (req, res) => {
	res.status(200).json({ jobs });
};

export const createJob = async (req, res) => {
	const job = await JobModel.create(req.body);
	res.status(201).json({ job });
};

export const getOneJob = async (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		throw new Error('no job with that ID');
	}
	res.status(200).json({ job });
};

export const editJob = async (req, res) => {
	const { company, position } = req.body;
	if (!company || !position) {
		res.status(400).json({ msg: 'Please provide valid company and position' });
		return;
	}
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		res.status(404).json({ msg: 'Please provide valid ID' });
		return;
	}
	job.company = company;
	job.position = position;
	res.status(200).json({ msg: 'job modified', job });
};

export const deleteJob = async (req, res) => {
	const { id } = req.params;
	const job = jobs.find((job) => job.id === id);
	if (!job) {
		res.status(404).json({ msg: 'Please provide valid ID' });
		return;
	}
	const newJobs = jobs.filter((job) => job.id !== id);
	jobs = newJobs;
	res.status(200).json({ msg: 'job deleted' });
};
