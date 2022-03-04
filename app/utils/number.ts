export const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('en-In', {
    style: 'currency',
    currency: currency,
    maximumSignificantDigits: 10,
  }).format(value);
};
