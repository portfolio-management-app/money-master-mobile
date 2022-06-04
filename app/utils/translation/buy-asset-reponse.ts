import { HttpError } from 'errors/base';
import { APP_CONTENT } from 'shared/constants';

const ERROR_MESSAGE = APP_CONTENT.buyScreen.error;

export const translateBuyAssetError = (error: HttpError) => {
  switch (error.code) {
    case 400:
      return ERROR_MESSAGE.notEnoughMoney;
    case 500:
      return ERROR_MESSAGE.serverError;
    default:
      return error.getMessage();
  }
};
