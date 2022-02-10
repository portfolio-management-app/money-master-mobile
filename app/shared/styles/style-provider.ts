import { colorScheme } from './color-scheme';
import { Dimensions, StyleSheet } from 'react-native';

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

export const styleProvider = StyleSheet.create({
  body: {
    backgroundColor: colorScheme.bg,
    flex: 1,
  },
  button: {
    borderRadius: 20,
    width: '100%',
    paddingVertical: 5,
    borderWidth: 1,
  },
  defaultButton: {
    borderRadius: 20,
    fontFamily: fontProvider.openSans,
  },
  centerVertical: {
    alignItems: 'center',
  },

  centerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textField: {
    borderBottomWidth: 1,
    borderColor: colorScheme.gray400,
    paddingBottom: 4,
    marginBottom: 40,
    fontFamily: fontProvider.openSans,
  },
});

export const assetModalStyle = StyleSheet.create({
  addNewButton: {
    borderRadius: 20,
    backgroundColor: colorScheme.theme,
    marginRight: 20,
    paddingHorizontal: 50,
  },
  cancelButton: {
    borderRadius: 20,
    backgroundColor: colorScheme.red500,
    paddingHorizontal: 50,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    backgroundColor: colorScheme.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  header: {
    textAlign: 'center',
    marginBottom: 40,
    fontWeight: 'bold',
  },
});
