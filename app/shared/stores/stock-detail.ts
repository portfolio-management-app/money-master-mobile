import { IStockTimeSeries, StockInformation, StockTimeSeries } from '../models';
import { cast, flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { Config } from 'config';
import { HttpError } from 'errors/base';
import { StockTimeSupport } from 'shared/types';

export const StockDetailStore = types
  .model('StockDetailStore', {
    stockInformation: StockInformation,
    timeSeries: types.array(StockTimeSeries),
    loading: types.boolean,
  })
  .actions((self) => {
    const getStockData = flow(function* (
      symbol: string,
      range: StockTimeSupport = '1min'
    ) {
      self.loading = true;

      const res = yield httpRequest.sendGet(
        `${Config.TWELVEDATA_URL}/time_series?symbol=${symbol}&interval=${range}&apikey=${Config.TWELVEDATA_API_KEY}`
      );

      if (res instanceof HttpError) {
        console.log(res);
      } else {
        const temp: Array<IStockTimeSeries> = [];
        for (let i = 0; i < res.values.length; i++) {
          const time = new Date(res.values[i]['datetime']).getTime();

          temp.push({
            datetime: time / 1000,
            open: parseFloat(res.values[i]['open']),
            close: parseFloat(res.values[i]['close']),
            high: parseFloat(res.values[i]['high']),
            low: parseFloat(res.values[i]['low']),
            volume: parseFloat(res.values[i]['volume']),
          });
        }

        self.timeSeries = cast(temp);
        self.stockInformation = res.meta;
      }
      self.loading = false;
    });
    return { getStockData };
  })
  .create({
    stockInformation: {
      symbol: '',
      interval: '',
      currency: '',
      exchange_timezone: '',
      exchange: '',
      type: '',
    },
    timeSeries: [],
    loading: false,
  });
