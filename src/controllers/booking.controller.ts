import { Response } from 'express';
import { AuthRequest } from '@/middlewares/auth.middleware';
import { asyncHandler } from '@/middlewares/async-handler.middleware';
import { NotFoundException, UnauthorizedException } from '@/utils/errors';
import { createBookingSchema, idSchema } from '@/validators/booking.validator';
import { Activity } from '@/models/activity.model';
import { Booking } from '@/models/order.model';
import { HTTPSTATUS } from '@/config/http.config';

export const createBooking = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    const { activityId } = createBookingSchema.parse(req.body);

    if (!userId) {
      throw new UnauthorizedException('Please login to book an activity');
    }

    const activity = await Activity.findById(activityId);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }

    const booking = await Booking.create({
      user: userId,
      activity: activityId,
    });

    res
      .status(HTTPSTATUS.CREATED)
      .json({ message: 'Activity booked successfully', data: { booking } });
  }
);

export const getMyBookings = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const userId = req.user?.id;
    if (!userId) {
      throw new UnauthorizedException('Please login to view your bookings');
    }

    const bookings = await Booking.find({ user: userId }).populate('activity');

    res.status(HTTPSTATUS.OK).json({
      message: 'Your all bookings are fetched successfully',
      data: { bookings },
    });
  }
);
