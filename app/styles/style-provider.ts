import { colorScheme } from './color-scheme';
import { Dimensions, StyleSheet } from 'react-native';

export const styleProvider = StyleSheet.create({
  body: {
    backgroundColor: colorScheme.white,
    flex: 1,
  },
});

export const fontProvider = {
  openSans: 'OpenSans',
};

export const dimensionProvider = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};
