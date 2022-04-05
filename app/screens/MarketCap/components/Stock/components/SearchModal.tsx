import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import { RootStackParamList } from 'navigation/types';
import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/MarketCap/constant';
import { BackSearchBar, StockSearchResult } from 'shared/components';
import { SearchModalMarket, StockDetailStore } from 'shared/stores';
import { useDebounce } from 'use-debounce';
type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Component = () => {
  const [text, setText] = React.useState('');
  const [value] = useDebounce(text, 500);

  const navigation = useNavigation<NavigationProps>();

  const onResultPress = async (symbol: string) => {
    await StockDetailStore.getStockData(symbol, undefined, undefined, '1');
    navigation.navigate('StockDetail', { symbol: symbol });
  };

  return (
    <Modal
      onRequestClose={() => SearchModalMarket.toggleStockSearch()}
      animationType="fade"
      visible={SearchModalMarket.stockSearch}
    >
      <BackSearchBar
        onChangeText={setText}
        placeholder={SCREEN_CONTENT.stockSearchPlaceholder}
        onPressBack={() => SearchModalMarket.toggleStockSearch()}
      />
      <StockSearchResult onStockPress={onResultPress} text={value} />
    </Modal>
  );
};

export const SearchModal = observer(Component);
