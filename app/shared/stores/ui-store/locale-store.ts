import { storage, LANG_KEY } from 'services/storage';
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
      storage.set(LANG_KEY, locale);
    };

    const initLocale = () => {
      const storageLocale: any = storage.getString(LANG_KEY);
      if (storageLocale) {
        self.currentLocale = storageLocale;
      }
    };
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
