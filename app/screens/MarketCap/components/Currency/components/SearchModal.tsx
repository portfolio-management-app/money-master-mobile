import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/MarketCap/constant';
import { BackSearchBar, CurrencySearchResult } from 'shared/components';
import { CurrencyDetailStore, SearchModalMarket } from 'shared/stores';
import { useDebounce } from 'use-debounce';

const Component = () => {
  const [text, setText] = React.useState('');
  const [value] = useDebounce(text, 500);
  const navigation = useNavigation<MainStackNavigationProp>();

  const handleItemPress = async (id: string, name: string, symbol: string) => {
    await CurrencyDetailStore.getCurrencyData(symbol, '1h');
    navigation.navigate('CurrencyDetail');
  };

  return (
    <Modal
      onRequestClose={() => SearchModalMarket.toggleCurrencySearch()}
      animationType="fade"
      visible={SearchModalMarket.currencySearch}
    >
      <BackSearchBar
        onChangeText={setText}
        placeholder={SCREEN_CONTENT.currencySearchPlaceholder}
        onPressBack={() => SearchModalMarket.toggleCurrencySearch()}
      />

      <CurrencySearchResult onItemPress={handleItemPress} text={value} />
    </Modal>
  );
};

export const SearchModal = observer(Component);
