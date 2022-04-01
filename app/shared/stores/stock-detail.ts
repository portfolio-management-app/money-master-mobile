import { getUnixTime, addDays } from 'date-fns';
import { StockInformation, StockTimeSeries } from '../models';
import { flow, types } from 'mobx-state-tree';
import { StockTimeSupport } from 'shared/types';
import { stockService } from 'services/stock';

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
      const res = yield stockService.getChartData(symbol, from, to, range);
      if (res) {
        self.timeSeries = res;
      }
    });

    const getStockInfo = flow(function* (symbol: string) {
      self.symbol = symbol;
      const res = yield stockService.getStockInfo(symbol);
      if (res) {
        self.stockInformation = res;
      }
    });
    return { getStockData, getChartData, getStockInfo };
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
