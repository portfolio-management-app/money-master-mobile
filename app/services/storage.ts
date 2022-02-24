import { MMKV } from 'react-native-mmkv';

export const LANG_KEY = 'lang';

export const TOKEN_KEY = 'ertscaUMfqacx';

export const storage = new MMKV();

let langKey: 'en' | 'vn' = 'en';

const value: any = storage.getString(LANG_KEY);

console.log('GETLANG KEY', value);
if (value) {
  langKey = value;
}

export const i18Key = langKey;
