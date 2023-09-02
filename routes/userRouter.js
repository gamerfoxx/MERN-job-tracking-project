import { Router } from 'express';
import {
	getApplicationStatus,
	getCurrentUser,
	updateUser,
} from '../controllers/userController.js';
const router = Router();

router.get('/currentuser', getCurrentUser);
router.get('/admin/appstats', getApplicationStatus);
router.patch('/updateuser', updateUser);

export default router;
