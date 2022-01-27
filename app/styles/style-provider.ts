import { colorScheme } from './color-scheme';
import { Dimensions, StyleSheet } from 'react-native';

export const styleProvider = StyleSheet.create({
  body: {
    backgroundColor: colorScheme.white,
    flex: 1,
  },
  button: {
    borderRadius: 20,
    width: '100%',
    paddingVertical: 5,
    borderWidth: 1,
  },
  centerVertical: {
    alignItems: 'center',
  },

  centerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const fontProvider = {
  openSans: 'OpenSans',
};

export const dimensionProvider = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export const iconProvider = {
  material: 'material',
  materialCommunity: 'material-community',
  antDesign: 'antdesign',
  entypo: 'entypo',
  evilicon: 'evilicon',
  feather: 'feather',
  fontAwesome: 'font-awesome',
  fontAwesome5: 'font-awesome-5',
  fontisto: 'fontisto',
  foundation: 'foundation',
  ionicon: 'ionicon',
  octicon: 'octicon',
  simpleLineIcon: 'simple-line-icon',
  zocial: 'zocial',
};
