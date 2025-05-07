import { Request, Response } from 'express';
import { HTTPSTATUS } from '@/config/http.config';
import { asyncHandler } from '@/middlewares/async-handler.middleware';
import { signinSchema, signupSchema } from '@/validators/auth.validator';
import { signinService, signupService } from '@/services/auth.service';

export const signupController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = signupSchema.parse(req.body);

    await signupService(data);

    res.status(HTTPSTATUS.OK).json({
      message: `User registered successfully, Now you can login`,
    });
  }
);

export const signinController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = signinSchema.parse(req.body);

    const { token } = await signinService(data);

    res.status(HTTPSTATUS.OK).json({
      message: `User logged in successfully`,
      data: {
        token,
      },
    });
  }
);
