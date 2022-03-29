import { types } from 'mobx-state-tree';

export const StockInformation = types.model('StockInformation', {
  c: types.number,
  d: types.number,
  dp: types.number,
  h: types.number,
  l: types.number,
  o: types.number,
  pc: types.number,
  t: types.number,
});

export const StockTimeSeries = types.model('StockTimeSeries', {
  datetime: types.number,
  open: types.number,
  high: types.number,
  low: types.number,
  close: types.number,
  volume: types.number,
});
