import { colorScheme } from './color-scheme';
import { Dimensions, StyleSheet } from 'react-native';

export const fontProvider = {
  openSans: 'OpenSans',
};

export const dimensionProvider = {
  width: Dimensions.get('screen').width,
  height: Dimensions.get('screen').height,
};

export const styleProvider = StyleSheet.create({
  body: {
    backgroundColor: colorScheme.bg,
    flex: 1,
  },

  centerVertical: {
    alignItems: 'center',
  },

  centerHorizontal: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  container: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colorScheme.gray400,
  },
  bottomDialog: {
    backgroundColor: colorScheme.white,
    paddingHorizontal: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  createModalHeader: {
    flexDirection: 'row',
  },

  buttonIcon: {
    width: 30,
    height: 30,
  },

  speedDialButton: {
    width: 50,
    height: 50,
    borderRadius: 50,

    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colorScheme.theme,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 5,
  },
  speedDialTooltip: {
    borderWidth: 1,
    borderColor: colorScheme.theme,
    backgroundColor: colorScheme.bg,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginRight: 10,

    borderRadius: 10,
    padding: 10,
  },
  speedDialWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  assetCard: {
    borderBottomColor: colorScheme.gray100,
    borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  assetGroupName: {
    marginLeft: 10,
    marginTop: 10,
  },
  dialog: {
    padding: 20,
    backgroundColor: colorScheme.white,
    borderRadius: 10,
  },
  searchBarTheme: {
    backgroundColor: colorScheme.theme,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  relativeView: {
    flex: 1,
    position: 'relative',
  },
  marketCapSearchResult: {
    borderBottomColor: colorScheme.gray400,
    borderBottomWidth: 0.5,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  card: {
    borderBottomWidth: 0.5,
    borderBottomColor: colorScheme.gray400,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  formBody: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  buyBtn: {
    backgroundColor: colorScheme.green400,
    marginRight: 20,
    borderRadius: 10,
  },
  sellBtn: {
    backgroundColor: colorScheme.red500,
    borderRadius: 10,
  },
  assetGroup: {
    paddingVertical: 10,
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
