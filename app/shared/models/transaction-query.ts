import { types } from 'mobx-state-tree';
import { ITransactionFilterType } from './types';
export const TransactionQuery = types
  .model('Pagination', {
    pageSize: types.number,
    pageNumber: types.number,
    startDate: types.maybeNull(types.string),
    endDate: types.maybeNull(types.string),
    type: types.union(
      types.literal('all'),
      types.literal('in'),
      types.literal('out')
    ),
  })
  .actions((self) => {
    const increasePageNumber = () => {
      self.pageNumber++;
    };

    const restPageNumber = () => {
      self.pageNumber = 1;
    };

    const setStartDate = (date: string) => {
      self.startDate = date;
    };
    const setEndDate = (date: string) => {
      self.endDate = date;
    };
    const reset = () => {
      self.pageNumber = 1;
      self.startDate = null;
      self.endDate = null;
      self.type = 'all';
    };

    const setType = (type: ITransactionFilterType) => {
      self.type = type;
    };
    return {
      increasePageNumber,
      reset,
      restPageNumber,
      setStartDate,
      setEndDate,
      setType,
    };
  });
