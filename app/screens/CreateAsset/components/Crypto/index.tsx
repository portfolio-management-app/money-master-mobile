import { useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
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
import { CoinDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { ModalProps } from 'shared/types';
import { useDebounce } from 'use-debounce';

const HEADER = SCREEN_CONTENT.assetPicker;

const Component = ({ onClose }: ModalProps) => {
  const [text, setText] = React.useState('');
  const navigation = useNavigation();
  const [value] = useDebounce(text, 500);

  const handleCoinPress = async (id: string) => {
    await CoinDetailStore.getCoinInfo(id);
    navigation.navigate(screenName.buyCrypto as never);
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
