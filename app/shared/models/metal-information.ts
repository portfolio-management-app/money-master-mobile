import { types } from 'mobx-state-tree';

export const MetalItem = types.model('MetalItem', {
  curr: types.string,
  xauPrice: types.number,
  xagPrice: types.number,
  chgXau: types.number,
  chgXag: types.number,
  pcXau: types.number,
  pcXag: types.number,
  xauClose: types.number,
  xagClose: types.number,
});

export const MetalInformation = types.model({
  ts: types.number,
  tsj: types.number,
  date: types.string,
  items: types.array(MetalItem),
});
