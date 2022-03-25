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
  buyPrice: types.number,
  currentPrice: types.number,
});
