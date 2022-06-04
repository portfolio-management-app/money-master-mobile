import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import {
  CreateModalHeader,
  CurrencySearchResult,
  PlatformView,
  SearchBar,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT, SEARCH_BAR_CONTENT } from 'shared/constants';
import { CurrencyDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { ModalProps } from 'shared/types';
import { useDebounce } from 'use-debounce';

const Component = ({ onClose }: ModalProps) => {
  const [text, setText] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const navigation = useNavigation<MainStackNavigationProp>();
  const [value] = useDebounce(text, 500);
  const handleCurrencyPress = async (
    id: string,
    name: string,
    symbol: string
  ) => {
    setLoading(true);
    await CurrencyDetailStore.getCurrencyInfo(symbol);
    setLoading(false);
    navigation.navigate('BuyCash', { transactionType: 'buyFromOutside' });
  };

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
      <CurrencySearchResult onItemPress={handleCurrencyPress} text={value} />

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
