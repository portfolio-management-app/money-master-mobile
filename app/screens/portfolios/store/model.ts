import { types } from 'mobx-state-tree';

export const PortfolioInformation = types.model('PortfolioInformation', {
  name: types.string,
  dailyIncrease: types.number,
  balance: types.number,
});
