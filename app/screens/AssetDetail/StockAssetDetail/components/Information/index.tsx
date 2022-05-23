import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { StockInformationCard } from 'shared/components';
import { StockAssetStore } from 'shared/stores';

export const Information = observer(() => {
  const { information } = StockAssetStore;
  return (
    <View style={{ marginTop: 30 }}>
      <StockInformationCard asset={information} />
    </View>
  );
});
