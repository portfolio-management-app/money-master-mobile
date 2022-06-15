import { APP_CONTENT } from 'shared/constants';
import { HttpError } from 'errors/base';

const ERRORS = APP_CONTENT.updatePasswordScreen.error;

export const translateUpdatePasswordMessage = (error: HttpError) => {
  switch (error.code) {
    case 400:
      switch (error.httpMessage) {
        case 'Old password not correct':
          return ERRORS.oldPassNotMatch;
        default:
          return ERRORS.serverError;
      }
    case 500:
      return ERRORS.serverError;
    default:
      return ERRORS.serverError;
  }
};
