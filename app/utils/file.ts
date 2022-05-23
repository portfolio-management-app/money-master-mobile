import { parseToString } from './date';
import { APP_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { translateTransactionType } from './translation';

const columns = APP_CONTENT.exportExcelColumns;

export const buildTransactionJSONForExcelFile = (
  transactionList: Array<ITransactionItem>
) => {
  const result: Array<any> = [];
  for (const transaction of transactionList) {
    const data: any = {};
    data[columns.id] = transaction.id;
    data[columns.from] = transaction.referentialAssetName;
    data[columns.to] = transaction.destinationAssetName
      ? transaction.destinationAssetName
      : columns.rows.fund;
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
