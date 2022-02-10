import { UserStore } from 'shared/stores';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const LANG_KEY = 'LANG';

export const TOKEN_KEY = 'jkfhsajfucggbeqw';

export const storage = new Storage({
  // maximum capacity, default 1000 key-ids
  size: 1000,

  // Use AsyncStorage for RN apps, or window.localStorage for web apps.
  // If storageBackend is not set, data will be lost after reload.
  storageBackend: AsyncStorage, // for web: window.localStorage

  // expire time, default: 1 day (1000 * 3600 * 24 milliseconds).
  // can be null, which means never expire.
  defaultExpires: null,

  // cache data in the memory. default is true.
  enableCache: true,

  // if data was not found in storage or expired data was found,
  // the corresponding sync method will be invoked returning
  // the latest data.
  sync: {
    // we'll talk about the details later.
  },
});

storage
  .load({ key: LANG_KEY })
  .then((value) => {
    console.log('Loaded lang', value);
  })
  .catch((error) => {
    console.warn(error.message);
    switch (error.name) {
      case 'NotFoundError':
        storage
          .save({ key: LANG_KEY, data: 'en' })
          .then(() => console.log('Saved lang'))
          .catch((error) => console.log(error));
        break;
      case 'ExpiredError':
        storage
          .save({ key: LANG_KEY, data: 'en' })
          .then(() => console.log('Saved lang'))
          .catch((error) => console.log(error));
        break;
    }
  });

storage
  .load({ key: TOKEN_KEY })
  .then((value) => {
    console.log('Loaded token', value);
    UserStore.initUser(value);
  })
  .catch((error) => {
    UserStore.initUser(null);
    console.warn(error.message);
    switch (error.name) {
      case 'NotFoundError':
        console.log('NOT FOUND TOKEN');
        //TODO
        break;
      case 'ExpiredError':
        console.log('TOKEN EXPIRED');
        //TODO
        break;
    }
  });
