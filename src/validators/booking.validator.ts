import { z } from 'zod';

export const idSchema = z
  .string({ required_error: 'Activity ID is required' })
  .trim()
  .length(24, 'Invalid activity ID');

export const createBookingSchema = z.object({
  activityId: idSchema,
});
