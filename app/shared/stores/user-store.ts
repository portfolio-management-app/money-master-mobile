import { HttpError } from 'errors/base';
import { storage, TOKEN_KEY } from 'services/storage';
import { httpRequest } from 'services/api';
import { User } from 'shared/models';
import { types, flow } from 'mobx-state-tree';
import { HttpRequestResponse } from 'shared/types';
import { BASE_URL } from 'config';

type AuthenResponse = {
  email: string;
  token: string;
};

export const UserStore = types
  .model('UserStore', {
    user: User,
    pendingAuthen: true,
  })
  .actions((self) => {
    const register = flow(function* (
      email: string,
      password: string
    ): Generator<
      Promise<any>,
      HttpRequestResponse,
      HttpError | AuthenResponse
    > {
      const res: AuthenResponse | HttpError = yield httpRequest.sendPost(
        `${BASE_URL}/user`,
        {
          email: email,
          password: password,
        }
      );
      if (res instanceof HttpError) {
        return { isError: true, response: res };
      } else {
        storage.set(TOKEN_KEY, res.token);
        self.user.email = res.email;
        self.user.isLoggedIn = true;
        self.user.token = `Bearer ${res.token}`;
        console.log('Saved token');
        return { isError: false, response: res };
      }
    });

    const login = flow(function* (
      email: string,
      password: string
    ): Generator<
      Promise<any>,
      HttpRequestResponse,
      HttpError | AuthenResponse
    > {
      const res: AuthenResponse | HttpError = yield httpRequest.sendPost(
        `${BASE_URL}/authentication`,
        {
          email: email,
          password: password,
        }
      );
      if (res instanceof HttpError) {
        return { isError: true, response: res };
      } else {
        storage.set(TOKEN_KEY, res.token);
        self.user.email = res.email;
        self.user.isLoggedIn = true;
        self.user.token = `Bearer ${res.token}`;
        console.log('Saved token');
        return { isError: false, response: res };
      }
    });

    const initUser = flow(function* (token?: string) {
      if (token) {
        const res = yield httpRequest.sendGet(
          `${BASE_URL}/user/me`,
          `Bearer ${token}`
        );
        if (res instanceof HttpError) {
          self.pendingAuthen = false;
        } else {
          self.pendingAuthen = false;
          self.user.email = res.email;
          self.user.isLoggedIn = true;
          self.user.token = `Bearer ${token}`;
        }
      } else {
        self.pendingAuthen = false;
      }
    });

    const logout = () => {
      self.user.email = '';
      self.user.isLoggedIn = false;
      storage.delete(TOKEN_KEY);
      console.log('removed token');
    };

    return { register, logout, login, initUser };
  })
  .create({
    user: {
      email: '',
      token: '',
    },
  });
