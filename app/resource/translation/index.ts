import { NativeModules, Platform } from 'react-native';

const locale =
  Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier;

console.log(locale);

export {};
