import mongoose from 'mongoose';
import { Env } from './env.config';

export const connectDatabase = async () => {
  try {
    await mongoose.connect(Env.DATABASE_URL);
    console.log('✅ MongoDB database connected');
  } catch (error) {
    console.error('❌ Error during database connection:', error);
    process.exit(1);
  }
};
