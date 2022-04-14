export const formatCurrency = (value: number | bigint, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumSignificantDigits: 10,
  }).format(value);
};

export const calcPercent = (current: number, base: number) => {
  const result = Number((((current - base) / base) * 100).toFixed(2));
  return result;
};
