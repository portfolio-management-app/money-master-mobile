import React from 'react';
import { StyleSheet } from 'react-native';
import { PickerItemValue, View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/market-cap/constant';
import { CurrencyPicker, Icon, TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { CryptoStore } from '../store';
import { SearchModal } from './SearchModal';

const Component = () => {
  const handleChangeCurrency = React.useCallback((value: string) => {
    CryptoStore.resetPage(value);
    CryptoStore.getData();
  }, []);
  return (
    <View style={styles.filter}>
      <CurrencyPicker
        bgColor={colorScheme.theme}
        headerStyle="light-content"
        renderPicker={renderPicker}
        onChange={handleChangeCurrency}
      />
    </View>
  );
};

export const Filter = React.memo(Component);

const renderPicker = (value?: PickerItemValue, label?: string) => {
  return (
    <View style={styles.picker}>
      <TextContainer light>{value ? value : 'USD'}</TextContainer>
      <Icon.Entypo name="chevron-down" color={colorScheme.white} size={30} />
      <SearchModal />
    </View>
  );
};

const styles = StyleSheet.create({
  filter: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomColor: colorScheme.gray400,
    borderBottomWidth: 0.5,
    backgroundColor: colorScheme.theme,
    flexDirection: 'row',
    alignItems: 'center',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
