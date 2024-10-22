export enum ErrorCode {
  INTERNAL_SERVER_ERROR = 1001,
  BAD_REQUEST = 1002,
  UNPROCESSABLE_ENTITY = 1003,
  NOT_FOUND = 1004,
  GENDER_NOT_FOUND = 1005,
  GENDER_ALREADY_EXISTS = 1006,
  USER_NOT_FOUND = 1007,
  USER_ALREADY_EXISTS = 1008,
}

export class HttpException extends Error {
  message: string;
  errorCode: ErrorCode;
  statusCode: number;
  errors: any; // errors can be object or string or whatever

  constructor(
    message: string,
    errorCode: ErrorCode,
    statusCode: number,
    errors: any
  ) {
    super(message);
    this.message = message;
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.errors = errors;
  }
}
