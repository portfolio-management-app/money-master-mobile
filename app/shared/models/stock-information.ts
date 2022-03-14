import { SnapshotOut, types } from 'mobx-state-tree';

export const StockInformation = types.model('StockInformation', {
  symbol: types.string,
  interval: types.maybe(types.string),
  currency: types.maybe(types.string),
  exchange_timezone: types.maybe(types.string),
  exchange: types.maybe(types.string),
  type: types.maybe(types.string),
});

export const StockTimeSeries = types.model('StockTimeSeries', {
  datetime: types.string,
  open: types.string,
  high: types.string,
  low: types.string,
  close: types.string,
  volume: types.string,
});

export type IStockTimeSeries = SnapshotOut<typeof StockTimeSeries>;

export type IStockInformation = SnapshotOut<typeof StockInformation>;
