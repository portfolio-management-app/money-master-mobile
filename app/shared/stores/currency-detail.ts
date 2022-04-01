import { flow, types } from 'mobx-state-tree';
import { currencyService } from 'services/currency';
import {
  CurrencyTimeSeries,
  CurrencyInformation,
  ICurrencyInformation,
} from 'shared/models';
import { CurrencyTimeSupport } from 'shared/types';

export const CurrencyDetailStore = types
  .model('CurrencyChartStore', {
    chartData: types.array(CurrencyTimeSeries),
    loading: types.boolean,
    currencyInformation: CurrencyInformation,
  })
  .actions((self) => {
    const getCurrencyData = flow(function* (
      symbol: string,
      period: CurrencyTimeSupport
    ) {
      yield Promise.all([
        getChartData(period, symbol),
        getCurrencyInfo(symbol),
      ]);
    });
    const getChartData = flow(function* (
      period: CurrencyTimeSupport,
      symbol: string
    ) {
      self.loading = true;
      const res = yield currencyService.getChartData(period, symbol);
      if (res) {
        self.chartData = res;
      }
      self.loading = false;
    });

    const assignInfo = (info: ICurrencyInformation) => {
      self.currencyInformation = info;
    };

    const getCurrencyInfo = flow(function* (symbol: string) {
      const res = yield currencyService.getCurrencyInfo(symbol);
      if (res) {
        self.currencyInformation = res;
      }
    });

    return { getChartData, assignInfo, getCurrencyData, getCurrencyInfo };
  })
  .create({
    chartData: [],
    loading: false,
    currencyInformation: {
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
    },
  });
