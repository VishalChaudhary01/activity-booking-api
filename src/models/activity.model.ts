import mongoose, { Document } from 'mongoose';

interface ActivityDocument extends Document {
  title: string;
  description?: string;
  location: string;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
}

const activitySchema = new mongoose.Schema<ActivityDocument>(
  {
    title: { type: String, required: true },
    description: String,
    location: { type: String, required: true },
    date: { type: Date, required: true },
  },
  { timestamps: true }
);

export const Activity = mongoose.model<ActivityDocument>(
  'Activity',
  activitySchema
);
