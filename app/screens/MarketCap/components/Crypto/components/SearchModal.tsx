import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/MarketCap/constant';
import { BackSearchBar, CryptoSearchResult } from 'shared/components';
import { CoinDetailStore, SearchModalMarket } from 'shared/stores';
import { useDebounce } from 'use-debounce';
import { CryptoStore } from '../store';

const Component = () => {
  const [text, setText] = React.useState('');
  const [value] = useDebounce(text, 500);

  const navigation = useNavigation<MainStackNavigationProp>();

  const onItemPress = React.useCallback(
    async (id: string, name: string) => {
      await CoinDetailStore.getAllData(id, CryptoStore.currency, 1);
      navigation.navigate('CoinDetail', {
        id: id,
        name: name,
        currency: CryptoStore.currency,
      });
    },
    [navigation]
  );

  return (
    <Modal
      onRequestClose={() => SearchModalMarket.toggleCryptoSearch()}
      animationType="fade"
      visible={SearchModalMarket.cryptoSearch}
    >
      <BackSearchBar
        onChangeText={setText}
        placeholder={SCREEN_CONTENT.cryptoSearchPlaceholder}
        onPressBack={() => SearchModalMarket.toggleCryptoSearch()}
      />
      <CryptoSearchResult text={value} onCoinPress={onItemPress} />
    </Modal>
  );
};

export const SearchModal = observer(Component);
