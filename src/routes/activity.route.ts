import { getAllActivities } from '@/controllers/activity.controller';
import { Router } from 'express';

const activityRouter = Router();

activityRouter.get('/', getAllActivities);

export default activityRouter;
