import { NextFunction, Request, Response } from 'express';
import { HttpException, ErrorCode } from '../exceptions/RootExceptions';
import { ZodError } from 'zod';
import { InternalErrorException } from '../exceptions/InternalError';
import { BadRequestException } from '../exceptions/BadRequest';

export const errorHandlerMiddleware = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(error.statusCode).json({
    message: error.message,
    errorCode: error.errorCode,
    errors: error.errors,
  });
};

export const errorHandler = (method: Function) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await method(req, res, next);
    } catch (error) {
      let exception: HttpException;
      if (error instanceof HttpException) {
        exception = error;
      } else {
        if (error instanceof ZodError) {
          const errorMessages = error.issues.map((issue): string => {
            return issue.message;
          });
          exception = new BadRequestException(
            'Unprocessable entity',
            ErrorCode.UNPROCESSABLE_ENTITY,
            errorMessages.join(', ')
          );
        } else {
          exception = new InternalErrorException('Somthing went wrong');
        }
      }
      next(exception);
    }
  };
};
