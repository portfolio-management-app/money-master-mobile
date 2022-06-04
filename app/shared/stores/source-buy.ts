import { TransactionType } from 'shared/types';
import { types } from 'mobx-state-tree';
//Source of an asset buy from
export const SourceBuyStore = types
  .model('SourceBuy', {
    usingFund: types.boolean,
    usingCash: types.boolean,
    cashId: types.number,
    singleAssetTransactionType: types.union(
      types.literal('buyFromFund'),
      types.literal('buyFromCash'),
      types.literal('buyFromOutside'),
      types.literal('withdrawToCash'),
      types.literal('withdrawToOutside'),
      types.literal('moveToFund'),
      types.literal('addValue')
    ),
  })
  .actions((self) => {
    const changeSource = (
      usingFund: boolean,
      usingCash: boolean,
      cashId: number
    ) => {
      self.usingFund = usingFund;
      self.usingCash = usingCash;
      self.cashId = cashId;
    };

    const changeTransactionType = (type: TransactionType) => {
      self.singleAssetTransactionType = type;
    };
    return { changeSource, changeTransactionType };
  })
  .create({
    usingCash: false,
    usingFund: false,
    cashId: 0,
    singleAssetTransactionType: 'addValue',
  });
