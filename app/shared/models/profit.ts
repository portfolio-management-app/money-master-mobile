import { types } from 'mobx-state-tree';

export const Profit = types.model('Profit', {
  amount: types.number,
  endTime: types.string,
  startTime: types.string,
  unit: types.string,
});
