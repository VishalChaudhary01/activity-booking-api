import 'module-alias/register';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { Env } from '@/config/env.config';
import { connectDatabase } from './config/db.config';
import { seedActivities } from './seed/activity.seed';
import { errorHandler } from './middlewares/error-handler.middlre';
import { authMiddleware } from './middlewares/auth.middleware';

import authRoutes from './routes/auth.route';
import activityRoutes from './routes/activity.route';
import bookingRoutes from './routes/booking.route';

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Healthy API!' });
});

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/activities`, activityRoutes);
app.use(`${BASE_PATH}/bookings`, authMiddleware, bookingRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  await seedActivities();
  console.log(
    `api runnung at http://localhost:${Env.PORT} (in ${Env.NODE_ENV})`
  );
});
