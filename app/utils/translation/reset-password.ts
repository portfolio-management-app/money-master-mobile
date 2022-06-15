import { APP_CONTENT } from 'shared/constants';
import { HttpError } from 'errors/base';

const ERRORS = APP_CONTENT.resetPassword.errors;

export const translateResetPasswordMessage = (error: HttpError) => {
  switch (error.code) {
    case 400:
      switch (error.httpMessage) {
        case 'Cannot send email':
          return ERRORS.cannotSendEmail;
        case 'Email not exist':
          return ERRORS.emailNotExist;
        case 'OTP verify time is over':
          return ERRORS.otpTimeOver;
        case 'OTP not correct':
          return ERRORS.otpNotCorrect;
        default:
          return ERRORS.serverError;
      }
    case 500:
      return ERRORS.serverError;
    default:
      return ERRORS.serverError;
  }
};
