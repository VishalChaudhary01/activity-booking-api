import { Request, Response } from 'express';
import { HTTPSTATUS } from '@/config/http.config';
import { asyncHandler } from '@/middlewares/async-handler.middleware';
import { signinSchema, signupSchema } from '@/validators/auth.validator';
import { BadRequestException, NotFoundException } from '@/utils/errors';
import { User } from '@/models/user.model';
import { ErrorCodeEnum } from '@/enums/errror-code.enum';
import { signJwt } from '@/utils/jwt';

export const signup = asyncHandler(async (req: Request, res: Response) => {
  const data = signupSchema.parse(req.body);

  const isExist = await User.findOne({ email: data.email });
  if (isExist) {
    throw new BadRequestException('Email is already registered, Try to Login');
  }

  await User.create(data);

  res.status(HTTPSTATUS.OK).json({
    message: `User registered successfully, Now you can login`,
  });
});

export const signin = asyncHandler(async (req: Request, res: Response) => {
  const data = signinSchema.parse(req.body);

  const user = await User.findOne({
    email: data.email,
  });
  if (!user) {
    throw new NotFoundException(
      'Invalid email or password',
      ErrorCodeEnum.AUTH_USER_NOT_FOUND
    );
  }

  const matchPassword = await user.comparePassword(data.password);
  if (!matchPassword) {
    throw new BadRequestException('Invalid email or password');
  }

  const token = signJwt({ userId: user._id as string });

  res.status(HTTPSTATUS.OK).json({
    message: `User logged in successfully`,
    data: {
      token,
    },
  });
});
