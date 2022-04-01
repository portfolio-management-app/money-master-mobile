import { types } from 'mobx-state-tree';

export const CoinInformation = types.model('CoinInformation', {
  id: types.string,
  name: types.string,
  image: types.string,
  currentPrice: types.map(types.number),
  priceChange: types.map(types.number),
  marketCapRank: types.number,
  priceChangePercent: types.map(types.number),
  circulatingSupply: types.number,
  maxSupply: types.maybeNull(types.number),
  ath: types.map(types.number),
  athPercent: types.map(types.number),
  lastUpdate: types.string,
  athDate: types.map(types.string),
});
