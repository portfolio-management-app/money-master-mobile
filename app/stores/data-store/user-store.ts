import { httpRequest } from 'services/api';
import { User } from 'models';
import { types, flow } from 'mobx-state-tree';

type RegisterResponse = {
  email: string;
  id: string;
};

export const UserStore = types
  .model('UserStore', {
    user: User,
  })
  .actions((self) => {
    const register = flow(function* (email: string, password: string) {
      try {
        const res = yield httpRequest.sendPost('/auth', {
          email: email,
          password: password,
        });
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    });
    return { register };
  })
  .create({
    user: {
      email: '',
      id: '',
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
