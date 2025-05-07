import { compareValue, hashValue } from '@/utils/bcrypt';
import mongoose, { Document } from 'mongoose';

export interface UserDocument extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(value: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<UserDocument>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    if (this.password) {
      this.password = await hashValue(this.password);
    }
  }
  next();
});

userSchema.methods.comparePassword = async function (value: string) {
  return compareValue(value, this.password);
};

export const User = mongoose.model<UserDocument>('User', userSchema);
