import { types } from 'mobx-state-tree';

export const TransactionItem = types.model('TransactionItem', {
  singleAssetTransactionType: types.union(
    types.literal('newAsset'),
    types.literal('addValue'),
    types.literal('withdrawValue'),
    types.literal('sellAsset')
  ),
  id: types.number,
  referentialAssetId: types.number,
  referentialAssetType: types.string,
  amount: types.number,
  currencyCode: types.string,
  createdAt: types.string,
  lastChanged: types.string,
});
