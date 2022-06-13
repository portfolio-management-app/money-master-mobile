import { HttpError } from 'errors/base';
import { APP_CONTENT } from 'shared/constants';

const ERROR_MESSAGE = APP_CONTENT.createTransactionError.errors;

export const translateCreateTransactionError = (error: HttpError) => {
  switch (error.code) {
    case 400: {
      switch (error.getMessage()) {
        case 'The specified cash does not have sufficient amount':
          return ERROR_MESSAGE.cash;
        case 'Insufficient money amount in fund':
          return ERROR_MESSAGE.investFund;
        case 'Insufficient value':
          return ERROR_MESSAGE.assetSell;
        case 'Insufficient value to withdraw':
          return ERROR_MESSAGE.assetDraw;
        case 'Insufficient amount in source asset':
          return ERROR_MESSAGE.source;
        default:
          return ERROR_MESSAGE.serverError;
      }
    }

    case 500:
      return ERROR_MESSAGE.serverError;
    default:
      return ERROR_MESSAGE.serverError;
  }
};
