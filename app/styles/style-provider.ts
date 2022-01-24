import { colorScheme } from './color-scheme';
import { StyleSheet } from 'react-native';

export const styleProvider = StyleSheet.create({
  body: {
    backgroundColor: colorScheme.white,
  },
});

export const fontProvider = {
  openSans: 'OpenSans',
};
