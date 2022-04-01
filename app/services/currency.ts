import { Config } from 'config';
import { HttpError } from 'errors/base';
import { CurrencyTimeSupport } from 'shared/types';
import { httpRequest } from './http';
import { log } from './log';

class CurrencyService {
  async getChartData(period: CurrencyTimeSupport, symbol: string) {
    const res = await httpRequest.sendGet(
      `${Config.CURRENCY_API_URL}/history?symbol=${symbol}&period=${period}&access_key=${Config.CURRENCY_API_KEY}&level=0`
    );
    if (res instanceof HttpError) {
      log('ERROR WHEN GET CURRENCY DATA', res);
      return null;
    } else {
      try {
        const temp: Array<any> = [];
        Object.keys(res.response).forEach((key: string) => {
          temp.push(res.response[key]);
        });
        return temp;
      } catch (error) {
        return null;
      }
    }
  }
  async getCurrencyInfo(symbol: string) {
    const res = await httpRequest.sendGet(
      `${Config.CURRENCY_API_URL}/latest?symbol=${symbol}&access_key=${Config.CURRENCY_API_KEY}`
    );
    if (res instanceof HttpError) {
      log('ERROR WHEN GET CURRENCY DATA', res);
      return null;
    } else {
      return res.response[0];
    }
  }
}

export const currencyService = new CurrencyService();
