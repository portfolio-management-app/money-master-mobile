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
        console.log('Saved token');
        return { isError: false, response: res };
      }
    });

    const initUser = (token: string | null) => {
      if (token) {
        self.user.token = token;
        self.user.isLoggedIn = true;
      }
      self.pendingAuthen = false;
    };

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

/* "data": {
		"user": {
			"id": "US17eccaf6e81",
			"email": "hoa@gmail.com",
			"password": "$2b$10$o2g6LiP0LY5zD600XNHN5OLU6Vl4FDyna0xgtLur1wmT3jOwYw9qS",
			"createdAt": "2022-02-06T01:39:16.225Z",
			"updatedAt": "2022-02-06T01:39:16.225Z"
		},
		"accessToken":  */
