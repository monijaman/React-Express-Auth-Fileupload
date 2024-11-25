import { Router } from 'express';
import { validateToken } from '../controllers/authController';

const router: Router = Router();

// Route for token validation
router.post('/validate-token', validateToken);

export default router;
