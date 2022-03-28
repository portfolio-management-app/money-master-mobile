import { Config } from 'config';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import { httpRequest } from 'services/api';
import {
  CreateModalHeader,
  SearchBar,
  StockSearchResult,
  TransparentLoading,
} from 'shared/components';
import { SEARCH_BAR_CONTENT } from 'shared/constants';
import { ModalProps } from 'shared/types';
import { useDebounce } from 'use-debounce/lib';
import { CreateSheet } from './components';

export interface IStockPrice {
  c: number;
  h: number;
  l: number;
  o: number;
  pc: number;
  t: number;
}

const HEADER = SCREEN_CONTENT.assetPicker;

const Component = ({ onClose }: ModalProps) => {
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [openSheet, setOpenSheet] = React.useState(false);
  const [name, setName] = React.useState('');
  const [value] = useDebounce(text, 500);
  const [stockPrice, setStockPrice] = React.useState<IStockPrice>();

  const fetchStockPrice = async (symbol: string) => {
    setLoading(true);
    const res = await httpRequest.sendGet(
      `${Config.STOCK_API_URL}/quote?symbol=${symbol}&token=${Config.STOCK_API_KEY}`
    );

    setStockPrice(res);
    setOpenSheet(true);
    setLoading(false);
  };
  return (
    <>
      <CreateModalHeader
        onClose={onClose}
        title={HEADER.stock}
        hasRightButton={false}
      />
      <View style={styles.searchBar}>
        <SearchBar
          onSearch={setText}
          placeholder={SEARCH_BAR_CONTENT.placeholder}
        />
      </View>
      <StockSearchResult
        onStockPress={(symbol: string) => {
          setName(symbol);
          fetchStockPrice(symbol);
        }}
        text={value}
      />
      <CreateSheet
        name={name}
        stockPrice={stockPrice}
        open={openSheet}
        onClose={() => setOpenSheet(false)}
      />
      <TransparentLoading show={loading} />
    </>
  );
};

export const Stock = React.memo(Component);

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
