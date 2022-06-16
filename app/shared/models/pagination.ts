import { types } from 'mobx-state-tree';
export const Pagination = types
  .model('Pagination', {
    pageSize: types.number,
    pageNumber: types.number,
  })
  .actions((self) => {
    const increasePageNumber = () => {
      self.pageNumber++;
    };
    const reset = () => {
      self.pageNumber = 1;
    };
    return { increasePageNumber, reset };
  });
