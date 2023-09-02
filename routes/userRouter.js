import { Router } from 'express';
import {
	getApplicationStatus,
	getCurrentUser,
	updateUser,
} from '../controllers/userController.js';
import { validateUpdateUserInput } from '../middleware/validationMiddleware.js';
import { authorizePermissions } from '../middleware/authMiddleware.js';
const router = Router();

router.get('/currentuser', getCurrentUser);
router.get('/admin/appstats', [
	authorizePermissions('admin'),
	getApplicationStatus,
]);
router.patch('/updateuser', validateUpdateUserInput, updateUser);

export default router;
