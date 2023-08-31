import { Router } from 'express';
import { validateJobInput } from '../middleware/validationMiddleware.js';
const router = Router();

import {
	editJob,
	createJob,
	getAllJobs,
	getOneJob,
	deleteJob,
} from '../controllers/jobController.js';

router.route('/').get(getAllJobs).post(validateJobInput, createJob);

router
	.route('/:id')
	.get(getOneJob)
	.patch(validateJobInput, editJob)
	.delete(deleteJob);

export default router;
