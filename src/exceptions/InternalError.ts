import { ErrorCode, HttpException } from './RootExceptions';

export class InternalErrorException extends HttpException {
  constructor(message: string, errorCode?: ErrorCode, errors?: any) {
    super(
      message,
      (errorCode = errorCode || ErrorCode.INTERNAL_SERVER_ERROR),
      500,
      errors
    );
  }
}
