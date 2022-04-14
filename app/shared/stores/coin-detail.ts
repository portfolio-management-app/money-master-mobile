import { flow, types } from 'mobx-state-tree';
import { CryptoTimeSupport } from 'shared/types';
import { cryptoService } from 'services/crypto';
import { CoinInformation } from '../models';

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
    const getAllData = flow(function* (
      coinId: string,
      currency: string,
      day: CryptoTimeSupport
    ) {
      yield Promise.all([
        getChartData(coinId, currency, day),
        getCoinInfo(coinId),
      ]);
    });
    const getChartData = flow(function* (
      coinId: string,
      currency: string,
      day: CryptoTimeSupport
    ) {
      self.loading = true;
      self.coinInfo.id = coinId;
      self.currency = currency;
      self.range = day;
      const res = yield cryptoService.getChartData(coinId, currency, day);
      if (res) {
        self.chartData = res;
      }
      self.loading = false;
    });

    const getCoinInfo = flow(function* (coinId: string) {
      const res = yield cryptoService.getCoinInfo(coinId);
      if (res) {
        assignCoinInfo(res);
      }
    });

    const assignCoinInfo = (res: any) => {
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
      self.coinInfo.id = res.id;
      self.coinInfo.name = res.name;
      self.coinInfo.image = res.image.small;
      self.coinInfo.athDate = ath_date;
      self.coinInfo.lastUpdate = last_updated;
      self.coinInfo.ath = ath;
      self.coinInfo.circulatingSupply = circulating_supply;
      self.coinInfo.athPercent = ath_change_percentage;
      self.coinInfo.marketCapRank = market_cap_rank;

      self.coinInfo.maxSupply = max_supply;

      self.coinInfo.currentPrice = current_price;
      switch (self.range) {
        case 1:
          self.coinInfo.priceChangePercent =
            price_change_percentage_24h_in_currency;
          self.coinInfo.priceChange = price_change_24h_in_currency;
          break;
        case 7:
          self.coinInfo.priceChangePercent =
            price_change_percentage_7d_in_currency;

          break;
        case 30:
          self.coinInfo.priceChangePercent =
            price_change_percentage_30d_in_currency;

          break;
        case 365:
          self.coinInfo.priceChangePercent =
            price_change_percentage_1y_in_currency;
      }
    };
    return { getChartData, getCoinInfo, getAllData };
  });

export const CoinDetailStore = Store.create({
  coinInfo: {
    id: '',
    image: '',
    name: '',
    currentPrice: {},
    priceChange: {},
    marketCapRank: 0,
    priceChangePercent: {},
    maxSupply: 0,
    circulatingSupply: 0,
    ath: {},
    athPercent: {},
    lastUpdate: '',
    athDate: {},
  },
  currency: 'USD',
  chartData: [],
  range: 1,
  loading: false,
});
