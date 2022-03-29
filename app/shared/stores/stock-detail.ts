import { getUnixTime, addDays } from 'date-fns';
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
    symbol: types.string,
  })
  .actions((self) => {
    const getStockData = flow(function* (
      symbol: string,
      from: number = getUnixTime(addDays(new Date(), -1)),
      to: number = getUnixTime(new Date()),
      range: StockTimeSupport
    ) {
      self.loading = true;
      self.symbol = symbol;
      yield Promise.all([
        getChartData(symbol, from, to, range),
        getStockInfo(symbol),
      ]);

      self.loading = false;
    });

    const getChartData = flow(function* (
      symbol: string,
      from: number = getUnixTime(addDays(new Date(), -1)),
      to: number = getUnixTime(new Date()),
      range: StockTimeSupport
    ) {
      const res = yield httpRequest.sendGet(
        `${Config.STOCK_API_URL}/stock/candle?symbol=${symbol}&resolution=${range}&from=${from}&to=${to}&token=${Config.STOCK_API_KEY}`
      );

      if (res instanceof HttpError) {
        console.log(res);
      } else {
        if (res.s === 'ok') {
          const temp: Array<IStockTimeSeries> = [];
          for (let i = 0; i < res['t'].length; i++) {
            temp.push({
              close: res['c'][i],
              open: res['o'][i],
              high: res['h'][i],
              low: res['l'][i],
              datetime: res['t'][i],
              volume: res['v'][i],
            });
          }
          self.timeSeries = cast(temp);
        }
      }
    });

    const getStockInfo = flow(function* (symbol: string) {
      const res = yield httpRequest.sendGet(
        `${Config.STOCK_API_URL}/quote?symbol=${symbol}&token=${Config.STOCK_API_KEY}`
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        self.stockInformation = res;
      }
    });
    return { getStockData, getChartData };
  })
  .create({
    stockInformation: {
      c: 0,
      d: 0,
      dp: 0,
      h: 0,
      l: 0,
      o: 0,
      pc: 0,
      t: 0,
    },
    timeSeries: [],
    loading: false,
    symbol: '',
  });
