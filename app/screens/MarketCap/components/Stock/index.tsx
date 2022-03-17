import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { SearchForData } from 'shared/components';
import { styleProvider } from 'shared/styles';
import { SearchModal } from './components';

export const StockMarket = observer(() => {
  return (
    <View style={[styleProvider.centerVertical, { flex: 1 }]}>
      <SearchForData />
      <SearchModal />
    </View>
  );
});
