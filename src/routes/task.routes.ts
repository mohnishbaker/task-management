import express from 'express';
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getStats
} from '../controllers/task.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const router = express.Router();

router.use(authMiddleware);

router.post('/', createTask);
router.get('/', getTasks);
router.get('/stats/summary', getStats);
// router.put('/:id', updateTask);
// router.delete('/:id', deleteTask);


export default router;