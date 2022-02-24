import { LocaleType } from 'i18n';
import { MMKV } from 'react-native-mmkv';

export const LANG_KEY = 'lang';

export const TOKEN_KEY = 'ertscaUMfqacx';

export const storage = new MMKV();

let key: LocaleType = 'en';

const value: any = storage.getString(LANG_KEY);

console.log('GOT LANG KEY', value);
if (value) {
  key = value;
}

export const localeKey = key;
