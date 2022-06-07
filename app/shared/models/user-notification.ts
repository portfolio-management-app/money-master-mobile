import { types } from 'mobx-state-tree';

export const UserNotification = types.model('UserNotification', {
  id: types.number,
  createDate: types.string,
  assetId: types.number,
  portfolioId: types.number,
  assetName: types.string,
  assetType: types.union(
    types.literal('crypto'),
    types.literal('stock'),
    types.literal('bankSaving'),
    types.literal('realEstate'),
    types.literal('custom'),
    types.literal('cash'),
    types.literal('fund')
  ),
  currency: types.string,
  highThreadHoldAmount: types.number,
  lowThreadHoldAmount: types.number,
  notificationType: types.union(
    types.literal('assetReachValueHigh'),
    types.literal('assetReachValueLow')
  ),
  isRead: types.boolean,
});
