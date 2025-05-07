import express from 'express';
import {
  createBooking,
  getMyBookings,
} from '../controllers/booking.controller';

const bookingRouter = express.Router();

bookingRouter.post('/new', createBooking);
bookingRouter.get('/my-bookings', getMyBookings);

export default bookingRouter;
