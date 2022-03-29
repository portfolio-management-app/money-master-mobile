import { HttpError } from 'errors/base';
import { httpRequest } from './api';

const API_KEY = 'ni0urCJ84R_m0HioSVr6SC3jWcC7RXEW';

export const getStockChartData = async (
  symbol: string,
  from: string,
  to: string,
  range: string
) => {
  const res = await httpRequest.sendGet(
    `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/${range}/${from}/${to}?adjusted=true&sort=asc&limit=120&apiKey=${API_KEY}`
  );
  if (res instanceof HttpError) {
    return null;
  }

  return res.results;
};
