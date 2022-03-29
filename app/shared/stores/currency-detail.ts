import { Config } from 'config';
import { HttpError } from 'errors/base';
import { cast, flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { log } from 'services/log-service';
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
      console.log(period);
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.CURRENCY_API_URL}/history?symbol=${symbol}&period=${period}&access_key=${Config.CURRENCY_API_KEY}&level=0`
      );

      if (res instanceof HttpError) {
        log('ERROR WHEN GET CURRENCY DATA', res);
      } else {
        try {
          const temp: Array<any> = [];
          console.log('success');
          Object.keys(res.response).forEach((key: string) => {
            temp.push(res.response[key]);
          });
          self.chartData = cast(temp);
        } catch (error) {
          self.loading = false;
        }
      }

      self.loading = false;
    });

    const assignInfo = (info: ICurrencyInformation) => {
      self.currencyInformation = info;
    };

    const getCurrencyInfo = flow(function* (symbol: string) {
      const res = yield httpRequest.sendGet(
        `${Config.CURRENCY_API_URL}/latest?symbol=${symbol}&access_key=${Config.CURRENCY_API_KEY}`
      );
      if (res instanceof HttpError) {
        log('ERROR WHEN GET CURRENCY DATA', res);
      } else {
        self.currencyInformation = res.response[0];
      }
    });

    return { getChartData, assignInfo, getCurrencyData };
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
