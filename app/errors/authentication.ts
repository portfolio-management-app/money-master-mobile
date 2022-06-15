import { HttpError } from './base/http-error';

export class AuthenticationError extends HttpError {
  constructor(error: HttpError) {
    super();
    this.message = error.httpMessage;
    this.statusCode = error.code;
  }
}
