import { types } from 'mobx-state-tree';

export const CoinInformation = types.model('CoinInformation', {
  id: types.string,
  name: types.string,
  image: types.string,
  currentPrice: types.number,
  priceChange: types.number,
  marketCapRank: types.number,
  priceChangePercent: types.number,
  circulatingSupply: types.number,
  maxSupply: types.number,
});
