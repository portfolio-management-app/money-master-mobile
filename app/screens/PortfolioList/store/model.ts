import { types } from 'mobx-state-tree';

export const PortfolioInformation = types.model('PortfolioInformation', {
  id: types.number,
  name: types.string,
  dailyIncrease: types.number,
  balance: types.number,
});
