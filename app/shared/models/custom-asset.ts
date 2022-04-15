import { types } from 'mobx-state-tree';

export const CustomAsset = types.model('CustomAsset', {
  id: types.number,
  name: types.string,
  inputDay: types.string,
  inputMoneyAmount: types.number,
  inputCurrency: types.string,
  description: types.string,
  interestRate: 0,
  termRange: types.number,
});

export const CategoryAssetList = types.model('CategoryAssetList', {
  categoryId: types.string,
  categoryName: types.string,
  assets: types.array(CustomAsset),
});
