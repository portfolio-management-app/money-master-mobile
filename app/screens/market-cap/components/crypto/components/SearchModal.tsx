import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/market-cap/constant';
import { BackSearchBar, CryptoSearchResult } from 'shared/components';
import { SearchModalMarket } from 'shared/stores';
import { useDebounce } from 'use-debounce';

const Component = () => {
  const [text, setText] = React.useState('');
  const [value] = useDebounce(text, 500);

  const navigation = useNavigation();

  const onItemPress = React.useCallback(
    (id: string, name: string) => {
      navigation.navigate(
        screenName.coinDetail as never,
        { id: id, name: name } as never
      );
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
