import { HttpError } from 'errors/base';
import { types } from 'mobx-state-tree';

export const Response = types
  .model({
    errorMessage: types.string,
    isError: types.boolean,
    isSuccess: types.boolean,
    pending: types.boolean,
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
      self.errorMessage = res.httpMessage;
    };
    const deleteError = () => {
      self.isError = false;
      self.errorMessage = '';
    };
    const makePending = () => {
      self.pending = true;
    };
    const stopPending = () => {
      self.pending = false;
    };
    return {
      makeError,
      makeSuccess,
      deleteError,
      deleteSuccess,
      makePending,
      stopPending,
    };
  });
