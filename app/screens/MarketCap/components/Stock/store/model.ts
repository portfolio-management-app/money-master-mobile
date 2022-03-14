import { SnapshotIn, types } from 'mobx-state-tree';

export const StockItem = types.model('StockItem', {
  symbol: types.string,
  name: types.string,
  currency: types.string,
  exchange: types.string,
  mic_code: types.maybe(types.string),
  country: types.string,
  type: types.string,
});

export type IStockItem = SnapshotIn<typeof StockItem>;
