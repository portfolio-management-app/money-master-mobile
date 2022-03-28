import { Config } from 'config';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { httpRequest } from 'services/api';
import {
  CreateModalHeader,
  CurrencySearchResult,
  PlatformView,
  SearchBar,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT, SEARCH_BAR_CONTENT } from 'shared/constants';
import { styleProvider } from 'shared/styles';
import { ModalProps } from 'shared/types';
import { useDebounce } from 'use-debounce';
import { CreateSheet } from './components';
export interface ICurrencyPrice {
  id: string;
  o: string;
  h: string;
  l: string;
  c: string;
  ch: string;
  cp: string;
  t: string;
  s: string;
  tm: string;
}

const Component = ({ onClose }: ModalProps) => {
  const [text, setText] = React.useState('');
  const [openSheet, setOpenSheet] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [currencyPrice, setCurrencyPrice] = React.useState<ICurrencyPrice>();
  const [name, setName] = React.useState('');
  const [value] = useDebounce(text, 500);

  const fetchCurrencyPrice = React.useCallback(async (id: string) => {
    setLoading(true);
    const res = await httpRequest.sendGet(
      `${Config.CURRENCY_API_URL}/latest?id=${id}&access_key=${Config.CURRENCY_API_KEY}`
    );

    setCurrencyPrice(res.response[0]);
    setLoading(false);
    setOpenSheet(true);
  }, []);

  return (
    <PlatformView style={styleProvider.body}>
      <CreateModalHeader
        onClose={onClose}
        title={APP_CONTENT.currency}
        hasRightButton={false}
      />
      <View style={styles.searchBar}>
        <SearchBar
          onSearch={setText}
          placeholder={SEARCH_BAR_CONTENT.placeholder}
        />
      </View>
      <CurrencySearchResult
        onItemPress={(id: string, name: string, symbol: string) => {
          setName(symbol);
          fetchCurrencyPrice(id);
        }}
        text={value}
      />
      <CreateSheet
        onClose={() => {
          setOpenSheet(false);
        }}
        open={openSheet}
        name={name}
        price={currencyPrice}
      />
      <TransparentLoading show={loading} />
    </PlatformView>
  );
};

export const Cash = React.memo(Component);

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
