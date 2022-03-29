import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/MarketCap/constant';
import { BackSearchBar, StockSearchResult } from 'shared/components';
import { SearchModalMarket, StockDetailStore } from 'shared/stores';
import { useDebounce } from 'use-debounce';

const Component = () => {
  const [text, setText] = React.useState('');
  const [value] = useDebounce(text, 500);

  const navigation = useNavigation();

  const onResultPress = async (symbol: string) => {
    console.log(symbol);
    await StockDetailStore.getStockData(symbol, undefined, undefined, '1');
    navigation.navigate(
      screenName.stockDetail as never,
      { symbol: symbol } as never
    );
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
