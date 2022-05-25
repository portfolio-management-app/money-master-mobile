import { types } from 'mobx-state-tree';

export const BankAsset = types.model('BankAsset', {
  id: types.number,
  portfolioId: types.number,
  name: types.string,
  inputDay: types.string,
  inputMoneyAmount: types.number,
  inputCurrency: types.string,
  lastChanged: types.string,
  description: types.string,
  interestRate: types.number,
  termRange: types.number,
  isGoingToReinState: types.boolean,
});

export const RealEstateAsset = types.model('RealEstateAsset', {
  id: types.number,
  portfolioId: types.number,
  name: types.string,
  inputDay: types.string,
  inputMoneyAmount: types.number,
  inputCurrency: types.string,
  lastChanged: types.string,
  description: types.string,
  currentPrice: types.number,
});

export const CryptoAsset = types.model('CryptoAsset', {
  id: types.number,
  name: types.string,
  inputDay: types.string,
  currentAmountHolding: types.number,
  lastChanged: types.string,
  portfolioId: types.number,
  description: types.string,
  purchasePrice: types.number,
  currencyCode: types.string,
  cryptoCoinCode: types.string,
  currentPrice: types.number,
  currentAmountInCurrency: types.number,
});

export const StockAsset = types.model('StockAsset', {
  id: types.number,
  portfolioId: types.number,
  name: types.string,
  inputDay: types.string,
  lastChanged: types.string,
  description: types.string,
  currentAmountHolding: types.number,
  stockCode: types.string,
  marketCode: types.string,
  currentPrice: types.number,
  currencyCode: types.string,
  purchasePrice: types.number,
  currentAmountInCurrency: types.number,
});

export const CurrencyAsset = types.model('CurrencyAsset', {
  id: types.number,
  amount: types.number,
  currencyCode: types.string,
  name: types.string,
  inputDay: types.string,
  lastChanged: types.string,
  portfolioId: types.number,
  description: types.string,
});
