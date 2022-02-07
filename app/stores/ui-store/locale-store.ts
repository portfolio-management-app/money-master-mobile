import { storage, langKey } from 'services/storage';
import { i18n, LocaleType } from 'i18n';
import { flow, types } from 'mobx-state-tree';

export const LocaleStore = types
  .model('LocaleStore', {
    source: types.map(types.frozen()),
    currentLocale: types.union(types.literal('en'), types.literal('vn')),
  })
  .views((self) => ({
    get locale() {
      return self.source.get(self.currentLocale);
    },
  }))
  .actions((self) => {
    const changeLocale = (locale: LocaleType) => {
      self.currentLocale = locale;
      storage
        .save({ key: langKey, data: locale })
        .then(() => console.log('Changed locale store'))
        .catch((error) => console.log(error));
    };

    const initLocale = flow(function* () {
      try {
        const storageLocale = yield storage.load({ key: langKey });
        self.currentLocale = storageLocale;
      } catch (error: any) {
        console.log(error.name);
      }
    });
    return { changeLocale, initLocale };
  })

  .create({
    source: {
      en: i18n['en'],
      vn: i18n['vn'],
    },
    currentLocale: 'en',
  });

LocaleStore.initLocale();
