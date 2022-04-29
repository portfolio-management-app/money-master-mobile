import { types } from 'mobx-state-tree';

export const InvestFundInformation = types.model('InvestFundInformation', {
  currentAmount: types.number,
  isDeleted: types.boolean,
  portfolioId: types.number,
  initialCurrency: types.string,
});
