import { body, param, validationResult } from 'express-validator';
import mongoose from 'mongoose';

import {
	BadRequestError,
	NotFoundError,
	UnauthorizedError,
} from '../errors/customErrors.js';
import { JOB_STATUS, JOB_TYPE } from '../utils/constants.js';
import JobModel from '../models/JobModel.js';
import UserModel from '../models/UserModel.js';

const withValidationErrors = (validateValues) => {
	return [
		validateValues,
		(req, res, next) => {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const errorMessages = errors.array().map((error) => error.msg);
				if (errorMessages[0].startsWith('no job')) {
					throw new NotFoundError(errorMessages);
				}
				if (errorMessages[0].startsWith('not authorised')) {
					throw new UnauthorizedError('not authorised to access this route');
				}
				throw new BadRequestError(errorMessages);
			}
			next();
		},
	];
};

export const validateJobInput = withValidationErrors([
	body('company').notEmpty().withMessage('company is required'),
	body('position').notEmpty().withMessage('position is required'),
	body('jobLocation').notEmpty().withMessage('job location is required'),
	body('jobStatus')
		.isIn(Object.values(JOB_STATUS))
		.withMessage('invalid status'),
	body('jobType').isIn(Object.values(JOB_TYPE)).withMessage('invalid type'),
]);

export const validateRegisterInput = withValidationErrors([
	body('name').notEmpty().withMessage('name is required'),
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('invlaid email format')
		.custom(async (email) => {
			const user = await UserModel.findOne({ email });
			if (user) {
				throw new BadRequestError('email already exists');
			}
		}),
	body('password')
		.notEmpty()
		.withMessage('password is required')
		.isLength({ min: 8 })
		.withMessage('password must be at least 8 characters'),
	body('lastName').notEmpty().withMessage('lastName is required'),
	body('location').notEmpty().withMessage('location is required'),
]);

export const validateLoginInput = withValidationErrors([
	body('email')
		.notEmpty()
		.withMessage('email is required')
		.isEmail()
		.withMessage('invlaid email format'),
	body('password').notEmpty().withMessage('password is required'),
]);

export const validateParams = withValidationErrors([
	param('id').custom(async (value) => {
		const isValidId = mongoose.Types.ObjectId.isValid(value);
		if (!isValidId) throw new BadRequestError('invalid MongoDB id');

		const job = await JobModel.findById(value);

		if (!job) throw new NotFoundError(`No job with ID ${value}`);

		const isAdmin = req.user.role === 'admin';
		const isOwner = req.user.userId === job.createdBy.toString();
		if (!isAdmin && !isOwner)
			throw new UnauthorizedError('not authorised to access this route');
	}),
]);
