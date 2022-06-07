import { log } from 'services/log';

export const formatCurrency = (value: number | bigint, currency: string) => {
  currency = currency.toLowerCase();
  try {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      maximumSignificantDigits: 10,
    }).format(value);
  } catch (error) {
    log('Error when format currency', currency);
    return `${value} ${currency}`;
  }
};

export const calcPercent = (current: number, base: number) => {
  const result = Number((((current - base) / base) * 100).toFixed(2));
  return result;
};
