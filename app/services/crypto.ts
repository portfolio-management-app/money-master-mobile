import { Config } from 'config';
import { HttpError } from 'errors/base';
import { CryptoTimeSupport } from 'shared/types';
import { httpRequest } from './http';

class CryptoService {
  async getChartData(coinId: string, currency: string, day: CryptoTimeSupport) {
    const res = await httpRequest.sendGet(
      `${Config.COIN_API_URL}/coins/${coinId}/market_chart?vs_currency=${currency}&days=${day}`
    );
    if (res instanceof HttpError) {
      console.log(res.getMessage());
      return null;
    } else {
      return res.prices;
    }
  }

  async getCoinInfo(coinId: string) {
    const res = await httpRequest.sendGet(
      `${Config.COIN_API_URL}/coins/${coinId}`
    );
    if (res instanceof HttpError) {
      console.log(res.getMessage());
      return null;
    } else {
      return res;
    }
  }
}

export const cryptoService = new CryptoService();
