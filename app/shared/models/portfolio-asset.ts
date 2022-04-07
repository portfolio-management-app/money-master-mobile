import { types } from 'mobx-state-tree';

export const BankAsset = types.model('BankAsset', {
  id: types.number,
  name: types.string,
  inputDay: types.string,
  inputMoneyAmount: 0,
  inputCurrency: types.string,
  lastChanged: types.string,
  description: types.string,
  interestRate: types.number,
  termRange: types.number,
  isGoingToReinState: types.boolean,
});

export const RealEstateAsset = types.model('RealEstateAsset', {
  id: types.number,
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
  cryptoCoinCode: types.string,
  currentPrice: 0,
});
