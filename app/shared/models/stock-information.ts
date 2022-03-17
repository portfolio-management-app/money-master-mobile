import { types } from 'mobx-state-tree';

export const StockInformation = types.model('StockInformation', {
  symbol: types.string,
  interval: types.maybe(types.string),
  currency: types.maybe(types.string),
  exchange_timezone: types.maybe(types.string),
  exchange: types.maybe(types.string),
  type: types.maybe(types.string),
});

export const StockTimeSeries = types.model('StockTimeSeries', {
  datetime: types.number,
  open: types.number,
  high: types.number,
  low: types.number,
  close: types.number,
  volume: types.number,
});
