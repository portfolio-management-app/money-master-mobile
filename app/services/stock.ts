import { Config } from 'config';
import { getUnixTime, addDays } from 'date-fns';
import { HttpError } from 'errors/base';
import { IStockTimeSeries } from 'shared/models';
import { StockTimeSupport } from 'shared/types';
import { httpRequest } from './http';

class StockService {
  async getChartData(
    symbol: string,
    from: number = getUnixTime(addDays(new Date(), -1)),
    to: number = getUnixTime(new Date()),
    range: StockTimeSupport
  ) {
    const res = await httpRequest.sendGet(
      `${Config.STOCK_API_URL}/stock/candle?symbol=${symbol}&resolution=${range}&from=${from}&to=${to}&token=${Config.STOCK_API_KEY}`
    );
    if (res instanceof HttpError) {
      return null;
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
        return temp;
      }
      return null;
    }
  }
  async getStockInfo(symbol: string) {
    const res = await httpRequest.sendGet(
      `${Config.STOCK_API_URL}/quote?symbol=${symbol}&token=${Config.STOCK_API_KEY}`
    );
    if (res instanceof HttpError) {
      return null;
    }
    return res;
  }
}

export const stockService = new StockService();
