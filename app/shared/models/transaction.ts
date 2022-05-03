import { types } from 'mobx-state-tree';

export const TransactionItem = types.model('TransactionItem', {
  singleAssetTransactionType: types.union(
    types.literal('newAsset'),
    types.literal('addValue'),
    types.literal('withdrawValue'),
    types.literal('sellAsset')
  ),
  id: types.number,
  referentialAssetId: types.maybeNull(types.number),
  referentialAssetType: types.union(
    types.literal('crypto'),
    types.literal('stock'),
    types.literal('bankSaving'),
    types.literal('realEstate'),
    types.literal('custom'),
    types.null
  ),
  destinationAssetId: types.maybeNull(types.number),
  destinationAssetType: types.union(
    types.literal('crypto'),
    types.literal('stock'),
    types.literal('bankSaving'),
    types.literal('realEstate'),
    types.literal('custom'),
    types.null
  ),
  amount: types.number,
  currencyCode: types.string,
  createdAt: types.string,
  lastChanged: types.string,
});
