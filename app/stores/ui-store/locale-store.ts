import { i18n, LocaleType } from 'i18n';
import { types } from 'mobx-state-tree';

export const LocaleStore = types
  .model('LocaleStore', {
    source: types.map(types.frozen()),
    currentLocale: 'en',
  })
  .views((self) => ({
    get locale() {
      return self.source.get(self.currentLocale);
    },
  }))
  .actions((self) => {
    const changeLocale = (locale: LocaleType) => {
      self.currentLocale = locale;
    };
    return { changeLocale };
  })
  .create({
    source: {
      en: i18n['en'],
      vn: i18n['vn'],
    },
  });
