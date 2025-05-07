import mongoose, { Document, Types } from 'mongoose';

interface BookingDocument extends Document {
  user: Types.ObjectId;
  activity: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const bookingSchema = new mongoose.Schema<BookingDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    activity: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Activity',
      required: true,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model<BookingDocument>(
  'Booking',
  bookingSchema
);
