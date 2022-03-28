import { HttpError } from 'errors/base';
import { httpRequest } from './api';
const API_KEY = 'B2HS8W52QG13668H';

export const covertCurrency = async (from?: string, to?: string) => {
  if (!from || !to) {
    return null;
  }

  const res = await httpRequest.sendGet(
    `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${API_KEY}`
  );

  if (res instanceof HttpError) {
    return null;
  } else {
    return res['Realtime Currency Exchange Rate']['5. Exchange Rate'];
  }
};
