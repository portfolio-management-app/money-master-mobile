import { HttpError } from 'errors/base';
import { types } from 'mobx-state-tree';

export const TransactionResponse = types
  .model({
    errorMessage: types.string,
    isError: types.boolean,
    isSuccess: types.boolean,
  })
  .actions((self) => {
    const makeSuccess = () => {
      self.isSuccess = true;
    };
    const deleteSuccess = () => {
      self.isSuccess = false;
    };
    const makeError = (res: HttpError) => {
      self.isError = true;
      self.errorMessage = res.getMessage();
    };
    const deleteError = () => {
      self.isError = false;
      self.errorMessage = '';
    };
    return { makeError, makeSuccess, deleteError, deleteSuccess };
  });
