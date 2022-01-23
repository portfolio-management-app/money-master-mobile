import { User } from 'models';
import { types } from 'mobx-state-tree';

export const userStore = types
  .model('UserStore', {
    user: User,
  })
  .actions((self) => {
    const increaseAge = () => {
      self.user.age++;
    };
    return { increaseAge };
  })
  .create({
    user: {
      name: 'Hoa',
      age: 20,
    },
  });
