import 'module-alias/register';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { Env } from '@/config/env.config';
import { errorHandler } from './middlewares/error-handler.middlre';
import { connectDatabase } from './config/db.config';

import authRoutes from './routes/auth.route';

const app = express();
const BASE_PATH = Env.BASE_PATH;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Healthy API!' });
});

app.use(`${BASE_PATH}/auth`, authRoutes);

app.use(errorHandler);

app.listen(Env.PORT, async () => {
  await connectDatabase();
  console.log(
    `api runnung at http://localhost:${Env.PORT} (in ${Env.NODE_ENV})`
  );
});
