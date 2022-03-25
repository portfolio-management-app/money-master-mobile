import React from 'react';
import { View } from 'react-native-ui-lib';
import { SearchForData } from 'shared/components';
import { styleProvider } from 'shared/styles';
import { SearchModal } from './components';

export const CurrencyMarket = () => {
  return (
    <View style={styleProvider.relativeView}>
      <SearchForData />
      <SearchModal />
    </View>
  );
};
