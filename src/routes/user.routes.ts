import { Router } from 'express';
import { register, login, resetPassword } from '../controllers/user.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/reset-password', resetPassword);

export default router;
