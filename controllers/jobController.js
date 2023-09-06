import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';
import day from 'dayjs';

import JobModel from '../models/JobModel.js';

export const getAllJobs = async (req, res) => {
	const { search, jobStatus, jobType } = req.query;
	const queryObj = {
		createdBy: req.user.userId,
	};
	if (search) {
		queryObj.$or = [
			{ position: { $regex: search, $options: 'i' } },
			{ company: { $regex: search, $options: 'i' } },
		];
	}
	if (jobStatus && jobStatus !== 'all') {
		queryObj.jobStatus = jobStatus;
	}
	if (jobType && jobType !== 'all') {
		queryObj.jobType = jobType;
	}

	const sortOptions = {
		newest: '-createdAt',
		oldest: 'createdAt',
		'a-z': 'position',
		'z-a': '-position',
	};

	const sortKey = sortOptions[sort] || sortOptions.newest;
	//find can be used to find certain entries with a specific value based on the schema
	const jobs = await JobModel.find(queryObj).sort(sortKey);
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

export const showStats = async (req, res) => {
	let stats = await JobModel.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{ $group: { _id: '$jobStatus', count: { $sum: 1 } } },
	]);

	stats = stats.reduce((acc, curr) => {
		const { _id: title, count } = curr;
		acc[title] = count;
		return acc;
	}, {});

	const defaultStats = {
		pending: stats.pending || 0,
		interview: stats.interview || 0,
		declined: stats.declined || 0,
	};
	let monthlyApps = await JobModel.aggregate([
		{ $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
		{
			$group: {
				_id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
				count: { $sum: 1 },
			},
		},
		{ $sort: { '_id.year': -1, '_id.month': -1 } },
		{ $limit: 6 },
	]);

	monthlyApps = monthlyApps
		.map((item) => {
			const {
				_id: { year, month },
				count,
			} = item;
			const date = day()
				.month(month - 1)
				.year(year)
				.format('MMM YY');
			return { date, count };
		})
		.reverse();
	res.status(StatusCodes.OK).json({ defaultStats, monthlyApps });
};
