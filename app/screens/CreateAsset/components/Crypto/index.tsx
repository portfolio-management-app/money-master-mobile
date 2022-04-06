import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import {
  CreateModalHeader,
  CryptoSearchResult,
  PlatformView,
  SearchBar,
} from 'shared/components';
import { SEARCH_BAR_CONTENT } from 'shared/constants';
import { CoinDetailStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { ModalProps } from 'shared/types';
import { useDebounce } from 'use-debounce';

const HEADER = SCREEN_CONTENT.assetPicker;

const Component = ({ onClose }: ModalProps) => {
  const [text, setText] = React.useState('');
  const navigation = useNavigation<MainStackNavigationProp>();
  const [value] = useDebounce(text, 500);

  const handleCoinPress = async (id: string) => {
    await CoinDetailStore.getCoinInfo(id);
    navigation.navigate('BuyCrypto');
  };
  return (
    <PlatformView style={styleProvider.body}>
      <CreateModalHeader
        onClose={onClose}
        title={HEADER.nft}
        hasRightButton={false}
      />
      <View style={styles.searchBar}>
        <SearchBar
          onSearch={setText}
          placeholder={SEARCH_BAR_CONTENT.placeholder}
        />
      </View>
      <CryptoSearchResult onCoinPress={handleCoinPress} text={value} />
    </PlatformView>
  );
};

export const Crypto = React.memo(Component);

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
