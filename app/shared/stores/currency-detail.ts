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
    const getChartData = flow(function* (period: CurrencyTimeSupport) {
      console.log(period);
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.CURRENCY_API_URL}/history?id=${self.currencyInformation.id}&period=${period}&access_key=${Config.CURRENCY_API_KEY}&level=0`
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

    return { getChartData, assignInfo };
  })
  .create({
    chartData: [],
    loading: false,
    currencyInformation: {
      symbol: '',
      id: '',
      name: '',
    },
  });
