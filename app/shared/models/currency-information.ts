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
  id: '1',
  o: '1.09782',
  h: '1.09984',
  l: '1.0973',
  c: '1.09837',
  ch: '+0.00055',
  cp: '+0.05%',
  t: '1648532108',
  s: 'EURUSD',
  tm: '2022-03-29 05:35:08',
});
