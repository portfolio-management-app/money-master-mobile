export const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('vn-Vie', {
    style: 'currency',
    currency: currency,
    maximumSignificantDigits: 10,
  }).format(value);
};
