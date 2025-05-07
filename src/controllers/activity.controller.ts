import { Request, Response } from 'express';
import { HTTPSTATUS } from '@/config/http.config';
import { Activity } from '@/models/activity.model';
import { asyncHandler } from '@/middlewares/async-handler.middleware';

export const getAllActivities = asyncHandler(
  async (req: Request, res: Response) => {
    const activities = await Activity.find();

    res.status(HTTPSTATUS.OK).json({
      message: `All activities fetched successfully`,
      data: {
        activities,
      },
    });
  }
);
