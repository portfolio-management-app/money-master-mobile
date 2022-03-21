import { types } from 'mobx-state-tree';

export const User = types.model({
  email: types.string,
  isLoggedIn: false,
  token: types.string,
});
