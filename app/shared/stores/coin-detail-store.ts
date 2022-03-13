import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { COIN_API_URL } from 'config';
import { HttpError } from 'errors/base';
import { CoinInformation } from '../models';

const Store = types
  .model('CoinDataStore', {
    coinInfo: CoinInformation,
    chartData: types.array(types.array(types.number)),
    loading: types.boolean,
    currency: types.string,
    range: types.number,
  })
  .actions((self) => {
    const getChartData = flow(function* (
      coinId: string,
      currency: string,
      day: number
    ) {
      self.loading = true;
      self.coinInfo.id = coinId;
      self.currency = currency;
      self.range = day;
      try {
        const [chartRes, coinInfoRes] = yield Promise.all([
          httpRequest.sendGet(
            `${COIN_API_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${day}`
          ),
          httpRequest.sendGet(`${COIN_API_URL}/coins/${coinId}`),
        ]);
        if (chartRes instanceof HttpError) {
          console.log(chartRes.getMessage());
        } else {
          self.chartData = chartRes.prices.reverse();
        }
        if (coinInfoRes instanceof HttpError) {
          console.log(coinInfoRes.getMessage());
        } else {
          assignCoinInfo(coinInfoRes);
        }
        self.loading = false;
      } catch (err) {
        self.loading = false;
      }
    });

    const assignCoinInfo = (res: any) => {
      const currency = self.currency.toLocaleLowerCase();
      const {
        current_price,
        price_change_24h_in_currency,
        price_change_percentage_24h_in_currency,
      } = res.market_data;

      self.coinInfo.currentPrice = current_price[currency];
      self.coinInfo.priceChange = price_change_24h_in_currency[currency];
      self.coinInfo.image = res.image.small;
      self.coinInfo.priceChangePercent =
        price_change_percentage_24h_in_currency[currency];
    };
    return { getChartData };
  });

export const CoinDetailStore = Store.create({
  coinInfo: {
    id: '',
    image: '',
    name: '',
    currentPrice: 0,
    priceChange: 0,
    marketCapRank: 0,
    priceChangePercent: 0,
  },
  currency: 'USD',
  chartData: [],
  range: 1,
  loading: false,
});
