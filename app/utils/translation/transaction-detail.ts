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
    default:
      return type;
  }
};

export const translateAssetType = (type: string) => {
  switch (type) {
    default:
      return type;
  }
};
