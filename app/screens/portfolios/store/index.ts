import { types } from 'mobx-state-tree';
import { PortfolioInformation } from './model';

export const PortfolioStore = types
  .model('PortfolioStore', {
    portfolioList: types.array(PortfolioInformation),
  })
  .create({
    portfolioList: [
      { id: 1, name: 'Investment 1', dailyIncrease: 10.242, balance: 45.32426 },
      { id: 2, name: 'Investment 2', dailyIncrease: 4.345, balance: 121.2419 },
    ],
  });
