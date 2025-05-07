import { Env } from '@/config/env.config';
import { ErrorCodeEnum } from '@/enums/errror-code.enum';
import { UnauthorizedException } from '@/utils/errors';
import { verifyJwt } from '@/utils/jwt';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
  };
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token)
      throw new UnauthorizedException(
        'Authentication token not found',
        ErrorCodeEnum.AUTH_TOKEN_NOT_FOUND
      );

    const { payload, error } = verifyJwt(token);
    if (error || !payload) {
      throw new UnauthorizedException(
        'Invalid or expired authentication token',
        ErrorCodeEnum.AUTH_INVALID_TOKEN
      );
    }

    req.user = { id: payload.userId };
    next();
  } catch (err) {
    next(err);
  }
};
