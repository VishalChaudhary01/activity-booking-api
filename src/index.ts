import 'module-alias/register';
import 'dotenv/config';
import express, { Request, Response } from 'express';
import { Env } from '@/config/env.config';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ message: 'Healthy API!' });
});

app.listen(Env.PORT, () =>
  console.log(
    `api runnung at http://localhost:${Env.PORT} (in ${Env.NODE_ENV})`
  )
);
