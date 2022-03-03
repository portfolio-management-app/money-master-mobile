import { types } from 'mobx-state-tree';

export const ScrollStore = types
  .model('ScrollStore', {
    offSet: types.number,
  })
  .actions((self) => {
    const changeOffset = (val: number) => {
      self.offSet = val;
    };

    return { changeOffset };
  })
  .create({ offSet: 0 });
