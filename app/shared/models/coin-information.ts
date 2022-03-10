import { types } from 'mobx-state-tree';

export const CoinInformation = types.model('CoinInformation', {
  id: types.string,
  name: types.string,
  image: types.string,
  currentPrice: types.number,
  priceChange24h: types.number,
  marketCapRank: types.number,
});
