import { types } from 'mobx-state-tree';

export const PortfolioInformation = types.model('PortfolioInformation', {
  id: types.number,
  name: types.string,
  initialCash: types.number,
  initialCurrency: types.string,
  sum: types.number,
});
