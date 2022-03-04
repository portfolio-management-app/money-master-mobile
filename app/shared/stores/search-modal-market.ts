import { types } from 'mobx-state-tree';

export const SearchModalMarket = types
  .model('SearchModelMarket', {
    cryptoSearch: false,
    stockSearch: false,
    goldSearch: false,
    currencySearch: false,
  })
  .actions((self) => {
    const toggleCryptoSearch = () => {
      self.cryptoSearch = !self.cryptoSearch;
    };
    return { toggleCryptoSearch };
  })
  .create({});
