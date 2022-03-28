import { Config } from 'config';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import { httpRequest } from 'services/api';
import {
  CreateModalHeader,
  CryptoSearchResult,
  PlatformView,
  SearchBar,
  TransparentLoading,
} from 'shared/components';
import { SEARCH_BAR_CONTENT } from 'shared/constants';
import { styleProvider } from 'shared/styles';
import { ModalProps } from 'shared/types';
import { useDebounce } from 'use-debounce';
import { CreateSheet } from './components';
interface ICoinPrice {
  [key: string]: number;
}

const HEADER = SCREEN_CONTENT.assetPicker;

const Component = ({ onClose }: ModalProps) => {
  const [text, setText] = React.useState('');
  const [openSheet, setOpenSheet] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [coinPrice, setCoinPrice] = React.useState<ICoinPrice>();
  const [name, setName] = React.useState('');
  const [value] = useDebounce(text, 500);

  const fetchCoinPrice = React.useCallback(async (coinId: string) => {
    setLoading(true);
    const res = await httpRequest.sendGet(
      `${Config.COIN_API_URL}/coins/${coinId}?localization=false`
    );
    setCoinPrice(res.market_data.current_price);
    setLoading(false);
    setOpenSheet(true);
  }, []);

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
      <CryptoSearchResult
        onCoinPress={(id: string, name: string) => {
          setName(name);
          fetchCoinPrice(id);
        }}
        text={value}
      />
      <CreateSheet
        onClose={() => {
          setOpenSheet(false);
        }}
        open={openSheet}
        name={name}
        price={coinPrice}
      />
      <TransparentLoading show={loading} />
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
