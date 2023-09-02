import { Router } from 'express';
import {
	validateJobInput,
	validateParams,
} from '../middleware/validationMiddleware.js';
const router = Router();

import {
	editJob,
	createJob,
	getAllJobs,
	getOneJob,
	deleteJob,
} from '../controllers/jobController.js';

router
	.route('/')
	.get(validateParams, getAllJobs)
	.post(validateJobInput, createJob);

router
	.route('/:id')
	.get(validateParams, getOneJob)
	.patch(validateJobInput, editJob)
	.delete(validateParams, deleteJob);

export default router;
