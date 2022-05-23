import { HttpError } from 'errors/base';
import { storage, TOKEN_KEY } from 'services/storage';
import { httpRequest } from 'services/http';
import { User } from 'shared/models';
import { types, flow } from 'mobx-state-tree';
import { HttpRequestResponse } from 'shared/types';
import { Config } from 'config';
import { AuthenResponse } from './types';
import { log } from 'services/log';

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
        `${Config.BASE_URL}/user`,
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
        `${Config.BASE_URL}/authentication`,
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
          `${Config.BASE_URL}/user/me`,
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

    const googleLogin = flow(function* (token: string) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/authentication/google`,
        { provider: 'google', externalToken: token }
      );
      if (res instanceof HttpError) {
        log('Error when loggin with google', res);
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

    const logout = () => {
      self.user.email = '';
      self.user.isLoggedIn = false;
      storage.delete(TOKEN_KEY);
      console.log('removed token');
    };

    const registerDeviceToken = (deviceToken: string) => {
      console.log(deviceToken);
    };

    return {
      register,
      logout,
      login,
      initUser,
      googleLogin,
      registerDeviceToken,
    };
  })
  .create({
    user: {
      email: '',
      token: '',
    },
  });
