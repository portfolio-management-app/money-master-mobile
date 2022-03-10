import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { COIN_API_URL } from 'config';
import { HttpError } from 'errors/base';
import { CoinInformation } from '../models';

const Store = types
  .model('CoinDataStore', {
    coinInfo: types.maybeNull(CoinInformation),
    chartData: types.array(types.array(types.number)),
    loading: types.boolean,
    currency: types.string,
  })
  .actions((self) => {
    const getChartData = flow(function* (coinId: string, currency: string) {
      self.loading = true;
      self.currency = currency;
      try {
        const [chartRes, coinInfoRes] = yield Promise.all([
          httpRequest.sendGet(
            `${COIN_API_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=30`
          ),
          httpRequest.sendGet(`${COIN_API_URL}/coins/${coinId}`),
        ]);
        if (chartRes instanceof HttpError) {
          console.log(chartRes.getMessage());
        } else {
          self.chartData = chartRes.prices.reverse();
        }
        console.log(coinInfoRes);
        self.loading = false;
      } catch (err) {
        self.loading = false;
      }
    });
    return { getChartData };
  });

export const CoinDetailStore = Store.create({
  coinInfo: null,
  currency: 'USD',
  chartData: [],
  loading: false,
});
