import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import {
  CreateModalHeader,
  SearchBar,
  StockSearchResult,
  TransparentLoading,
} from 'shared/components';
import { SEARCH_BAR_CONTENT } from 'shared/constants';
import { StockDetailStore } from 'shared/stores';
import { ModalProps } from 'shared/types';
import { useDebounce } from 'use-debounce/lib';

const HEADER = SCREEN_CONTENT.assetPicker;

const Component = ({ onClose }: ModalProps) => {
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<MainStackNavigationProp>();
  const [value] = useDebounce(text, 500);
  const handleStockPress = async (symbol: string) => {
    setLoading(true);
    await StockDetailStore.getStockInfo(symbol);
    setLoading(false);
    navigation.navigate('BuyStock');
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
      <StockSearchResult onStockPress={handleStockPress} text={value} />

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
