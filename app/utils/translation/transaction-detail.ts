import { TRANSACTION_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';

export const translateTransactionType = (
  type: ITransactionItem['singleAssetTransactionType']
) => {
  switch (type) {
    case 'newAsset':
      return TRANSACTION_DETAIL_CONTENT.newAsset;
    case 'addValue':
      return TRANSACTION_DETAIL_CONTENT.add;
    case 'sellAsset':
      return TRANSACTION_DETAIL_CONTENT.sell;
    case 'withdrawValue':
      return TRANSACTION_DETAIL_CONTENT.draw;
    case 'moveToFund':
      return TRANSACTION_DETAIL_CONTENT.moveToFund;
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
