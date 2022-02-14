import { HttpError } from 'errors/base';
import { storage, TOKEN_KEY } from 'services/storage';
import { httpRequest } from 'services/api';
import { User } from 'shared/models';
import { types, flow } from 'mobx-state-tree';
import { HttpRequestResponse } from 'shared/types';

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
        '/user',
        {
          email: email,
          password: password,
        }
      );
      if (res instanceof HttpError) {
        return { isError: true, response: res };
      } else {
        yield storage.save({ key: TOKEN_KEY, data: res.token });
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
        '/authentication',
        {
          email: email,
          password: password,
        }
      );
      if (res instanceof HttpError) {
        return { isError: true, response: res };
      } else {
        yield storage.save({ key: TOKEN_KEY, data: res.token });
        self.user.email = res.email;
        self.user.isLoggedIn = true;
        self.user.token = `Bearer ${res.token}`;
        console.log('Saved token');
        return { isError: false, response: res };
      }
    });

    const initUser = flow(function* (token: string | null) {
      if (token) {
        const res = yield httpRequest.sendGet('/user/me', `Bearer ${token}`);
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
      storage
        .remove({ key: TOKEN_KEY })
        .then(() => console.log('removed token'));
    };

    return { register, logout, login, initUser };
  })
  .create({
    user: {
      email: '',
      token: '',
    },
  });
