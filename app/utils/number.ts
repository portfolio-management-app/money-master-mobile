export const formatCurrency = (value: number | bigint, currency: string) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    maximumSignificantDigits: 10,
  }).format(value);
};
