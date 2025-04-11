import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.routes';
import taskRoutes from './routes/task.routes';
import { apiLimiter } from './middlewares/rateLimit';
import statusMonitor from 'express-status-monitor';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(apiLimiter);
app.use(statusMonitor());

app.use('/api/users', userRoutes);
app.use('/api/tasks', taskRoutes);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
