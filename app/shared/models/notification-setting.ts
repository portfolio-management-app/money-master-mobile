import { types } from 'mobx-state-tree';

export const NotificationSetting = types.model('NotificationSetting', {
  id: types.number,
  assetId: types.number,
  portfolioId: types.number,
  assetName: types.string,
  highThreadHoldAmount: 0,
  lowThreadHoldAmount: 0,
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
  coinCode: types.maybeNull(types.string),
  stockCode: types.maybeNull(types.string),
  isHighOn: types.boolean,
  isLowOn: types.boolean,
});
