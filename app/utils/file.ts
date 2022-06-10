import { parseToString } from './date';
import { APP_CONTENT, TRANSACTION_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { translateTransactionType } from './translation';

const columns = APP_CONTENT.exportExcelColumns;

export const buildTransactionJSONForExcelFile = (
  transactionList: Array<ITransactionItem>
) => {
  const result: Array<any> = [];
  let index = 1;
  for (const transaction of transactionList) {
    const data: any = {};
    data[columns.id] = index++;
    data[columns.from] = getFrom(transaction);
    data[columns.to] = getTo(transaction);
    data[columns.amount] = transaction.amount;
    data[columns.currency] = transaction.currencyCode;
    data[columns.transactionType] = translateTransactionType(
      transaction.singleAssetTransactionType
    );
    data[columns.transactionDate] = parseToString(
      new Date(transaction.createdAt)
    );
    result.push(data);
  }
  return result;
};

export const getFrom = (transaction: ITransactionItem) => {
  switch (transaction.singleAssetTransactionType) {
    case 'addValue':
      if (transaction.referentialAssetId === null) {
        if (transaction.referentialAssetName === null)
          return TRANSACTION_DETAIL_CONTENT.outSide;
        return TRANSACTION_DETAIL_CONTENT.fund;
      }
      return transaction.referentialAssetName;
    case 'buyFromCash':
      return transaction.referentialAssetName;
    case 'buyFromOutside':
      return '';
    case 'moveToFund':
      return transaction.referentialAssetName;
    case 'withdrawToCash':
      return transaction.referentialAssetName;
    case 'buyFromFund':
      return TRANSACTION_DETAIL_CONTENT.fund;
    case 'withdrawToOutside':
      return transaction.referentialAssetName;
    default:
      return '';
  }
};

export const getTo = (transaction: ITransactionItem) => {
  switch (transaction.singleAssetTransactionType) {
    case 'addValue':
    case 'buyFromCash':
    case 'buyFromOutside':
      return transaction.destinationAssetName;
    case 'moveToFund':
      return TRANSACTION_DETAIL_CONTENT.fund;
    case 'withdrawToCash':
      return transaction.referentialAssetName;
    case 'buyFromFund':
      return transaction.destinationAssetName;
    case 'withdrawToOutside':
      return TRANSACTION_DETAIL_CONTENT.outSide;
    default:
      return '';
  }
};
