import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import mongoose from 'mongoose';
import { AppError } from '@/utils/errors';
import { HTTPSTATUS } from '@/config/http.config';
import { ErrorCodeEnum } from '@/enums/errror-code.enum';
import { formatZodError, getErrorMessage } from '@/utils';

export const errorHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  _next
): any => {
  console.log(`❌ Error occured on PATH: ${req.path}`);
  console.error(error);

  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
      errorCode: error.errorCode,
    });
  }

  if (error instanceof SyntaxError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid JSON format. Please check your request body.',
      errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
  }

  if (error instanceof ZodError) {
    return formatZodError(res, error);
  }

  // Mongoose errors
  if (error instanceof mongoose.Error.ValidationError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Mongoose validation error',
      error: error.errors,
      errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
  }

  if (error instanceof mongoose.Error.CastError) {
    return res.status(HTTPSTATUS.BAD_REQUEST).json({
      message: 'Invalid ID format or invalid query parameter',
      error: getErrorMessage(error),
      errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
  }

  // MongoServerError (for duplicate key errors like unique field violation)
  if (error.name === 'MongoServerError' && error.code === 11000) {
    return res.status(HTTPSTATUS.CONFLICT).json({
      message: 'Duplicate key error',
      error: error.keyValue,
      errorCode: ErrorCodeEnum.VALIDATION_ERROR,
    });
  }

  return res.status(HTTPSTATUS.INTERNAL_SERVER_ERROR).json({
    message: 'Internal Server Error',
    error: getErrorMessage(error) || 'Unknown error occured',
    errorCode: ErrorCodeEnum.INTERNAL_SERVER_ERROR,
  });
};
