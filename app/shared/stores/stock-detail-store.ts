import { StockInformation, StockTimeSeries } from '../models';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { Config } from 'config';
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
      range: StockTimeSupport
    ) {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.STOCK_API_URL}/time_series?symbol=${symbol}&interval=${range}&apikey=${Config.STOCK_API_KEY}`
      );
      self.stockInformation = res.meta;
      self.timeSeries = res.values;
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
