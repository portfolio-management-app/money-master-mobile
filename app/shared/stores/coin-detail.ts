import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { Config } from 'config';
import { HttpError } from 'errors/base';
import { CoinInformation } from '../models';
import { CryptoTimeSupport } from 'shared/types';

const Store = types
  .model('CoinDataStore', {
    coinInfo: CoinInformation,
    chartData: types.array(types.array(types.number)),
    loading: types.boolean,
    currency: types.string,
    range: types.union(
      types.literal(1),
      types.literal(7),
      types.literal(30),
      types.literal(365)
    ),
  })
  .actions((self) => {
    const getChartData = flow(function* (
      coinId: string,
      currency: string,
      day: CryptoTimeSupport
    ) {
      self.loading = true;
      self.coinInfo.id = coinId;
      self.currency = currency;
      self.range = day;
      try {
        const [chartRes, coinInfoRes] = yield Promise.all([
          httpRequest.sendGet(
            `${Config.COIN_API_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${day}`
          ),
          httpRequest.sendGet(`${Config.COIN_API_URL}/coins/${coinId}`),
        ]);
        if (chartRes instanceof HttpError) {
          console.log(chartRes.getMessage());
        } else {
          self.chartData = chartRes.prices;
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
        market_cap_rank,
        max_supply,
        ath,
        last_updated,
        circulating_supply,
        ath_change_percentage,
        price_change_24h_in_currency,
        price_change_percentage_24h_in_currency,
        price_change_percentage_7d_in_currency,
        price_change_percentage_30d_in_currency,
        price_change_percentage_1y_in_currency,
        ath_date,
      } = res.market_data;

      self.coinInfo.image = res.image.small;
      self.coinInfo.athDate = ath_date[currency];
      self.coinInfo.lastUpdate = last_updated;
      self.coinInfo.ath = ath[currency];
      self.coinInfo.circulatingSupply = circulating_supply;
      self.coinInfo.athPercent = ath_change_percentage[currency];
      self.coinInfo.marketCapRank = market_cap_rank;

      self.coinInfo.maxSupply = max_supply;

      self.coinInfo.currentPrice = current_price[currency];
      switch (self.range) {
        case 1:
          self.coinInfo.priceChangePercent =
            price_change_percentage_24h_in_currency[currency];
          self.coinInfo.priceChange = price_change_24h_in_currency[currency];
          break;
        case 7:
          self.coinInfo.priceChangePercent =
            price_change_percentage_7d_in_currency[currency];

          break;
        case 30:
          self.coinInfo.priceChangePercent =
            price_change_percentage_30d_in_currency[currency];

          break;
        case 365:
          self.coinInfo.priceChangePercent =
            price_change_percentage_1y_in_currency[currency];
      }
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
    maxSupply: 0,
    circulatingSupply: 0,
    ath: 0,
    athPercent: 0,
    lastUpdate: '',
    athDate: '',
  },
  currency: 'USD',
  chartData: [],
  range: 1,
  loading: false,
});
