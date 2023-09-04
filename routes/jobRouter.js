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
import { checkForTest } from '../middleware/authMiddleware.js';

router
	.route('/')
	.get(getAllJobs)
	.post(checkForTest, validateJobInput, createJob);

router
	.route('/:id')
	.get(validateParams, getOneJob)
	.patch(checkForTest, validateJobInput, editJob)
	.delete(checkForTest, validateParams, deleteJob);

export default router;
