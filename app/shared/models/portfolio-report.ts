import { types } from 'mobx-state-tree';

export const PieChartItem = types.model('PieChartItem', {
  assetType: types.string,
  sumValue: types.number,
});
