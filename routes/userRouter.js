import { Router } from 'express';
import {
	getApplicationStatus,
	getCurrentUser,
	updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
const router = Router();

router.get('/currentuser', getCurrentUser);
router.get('/admin/appstats', getApplicationStatus);
router.patch('/updateuser', validateUpdateUserInput, updateUser);

export default router;
