import { TRANSACTION_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';

export const translateTransactionType = (
  type: ITransactionItem['singleAssetTransactionType']
) => {
  switch (type) {
    case 'buyFromOutside':
      return TRANSACTION_DETAIL_CONTENT.buy;
    case 'buyFromCash':
      return TRANSACTION_DETAIL_CONTENT.buy;
    case 'addValue':
      return TRANSACTION_DETAIL_CONTENT.add;
    case 'withdrawToCash':
      return TRANSACTION_DETAIL_CONTENT.sell;
    case 'withdrawToOutside':
      return TRANSACTION_DETAIL_CONTENT.draw;
    case 'moveToFund':
      return TRANSACTION_DETAIL_CONTENT.transfer;
    default:
      return type;
  }
};

export const translateAssetType = (
  type: ITransactionItem['destinationAssetType'] | null
) => {
  switch (type) {
    case 'cash':
      return TRANSACTION_DETAIL_CONTENT.cash;
    case 'bankSaving':
      return TRANSACTION_DETAIL_CONTENT.bank;
    case 'crypto':
      return TRANSACTION_DETAIL_CONTENT.crypto;
    case 'stock':
      return TRANSACTION_DETAIL_CONTENT.stock;
    case 'realEstate':
      return TRANSACTION_DETAIL_CONTENT.realEstate;
    case 'fund':
      return TRANSACTION_DETAIL_CONTENT.fund;
    default:
      return type !== null ? type : '';
  }
};
