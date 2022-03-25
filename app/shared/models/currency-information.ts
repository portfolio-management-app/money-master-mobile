import { types } from 'mobx-state-tree';

export const CurrencyTimeSeries = types.model('CurrencyTimSeries', {
  o: types.string,
  h: types.string,
  l: types.string,
  c: types.string,
  v: types.string,
  t: types.number,
  tm: types.string,
});

export const CurrencyInformation = types.model('CurrencyInformation', {
  symbol: types.string,
  name: types.string,
  id: types.string,
});
