import { ErrorCodeEnum } from '@/enums/errror-code.enum';
import { User } from '@/models/user.model';
import { BadRequestException, NotFoundException } from '@/utils/errors';
import { signJwt } from '@/utils/jwt';
import { SigninInput, SignupInput } from '@/validators/auth.validator';

export const signupService = async (data: SignupInput) => {
  const isExist = await User.findOne({ email: data.email });
  if (isExist) {
    throw new BadRequestException('Email is already registered, Try to Login');
  }

  await User.create(data);

  return;
};

export const signinService = async (data: SigninInput) => {
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

  return { token };
};
