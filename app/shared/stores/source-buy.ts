import { types } from 'mobx-state-tree';
//Source of an asset buy from
export const SourceBuyStore = types
  .model('SourceBuy', {
    usingFund: types.boolean,
    usingCash: types.boolean,
    cashId: types.number,
  })
  .actions((self) => {
    const changeSource = (
      usingFund: boolean,
      usingCash: boolean,
      cashId: number
    ) => {
      self.usingFund = usingFund;
      self.usingCash = usingCash;
      self.cashId = cashId;
    };
    return { changeSource };
  })
  .create({
    usingCash: false,
    usingFund: false,
    cashId: 0,
  });
