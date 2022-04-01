import { HttpError } from 'errors/base';
import { Config } from 'config';
import { cast, flow, SnapshotOut, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';

const Crypto = types.model('Crypto', {
  id: types.string,
  name: types.string,
  image: types.string,
  currentPrice: types.number,
  priceChange: types.number,
  lastUpdate: types.string,
  pricePercent: types.number,
});

export type ICrypto = SnapshotOut<typeof Crypto>;

export const CryptoStore = types
  .model('CryptoStore', {
    page: 0,
    perPage: 50,
    order: 'market_cap_desc',
    currency: 'usd',
    data: types.array(Crypto),
    isLoading: false,
    dataVersion: 0,
  })
  .actions((self) => {
    const getData = flow(function* () {
      console.log('start');
      self.isLoading = true;
      const res = yield httpRequest.sendGet(
        `${Config.COIN_API_URL}/coins/markets?vs_currency=${
          self.currency
        }&order=${self.order}&per_page=${
          self.perPage
        }&page=${++self.page}&sparkline=false`
      );
      if (res instanceof HttpError) {
        console.log(res);
        self.isLoading = false;
      } else {
        const temp: Array<ICrypto> = [];
        res.forEach((data: any) => {
          temp.push({
            id: data.id,
            name: data.name,
            image: data.image,
            priceChange: data.price_change_24h,
            currentPrice: data.current_price,
            lastUpdate: data.last_updated,
            pricePercent: data.price_change_percentage_24h,
          });
        });
        self.dataVersion++;
        self.data.push(...temp);
      }
      self.isLoading = false;
    });

    const resetPage = (currency?: string) => {
      self.page = 0;
      self.data = cast([]);
      if (currency) {
        self.currency = currency;
      }
    };

    return { getData, resetPage };
  })
  .create({
    data: [],
  });
