import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { CryptoInformationCard } from 'shared/components';
import { CryptoAssetStore } from 'shared/stores';

export const Information = observer(() => {
  const { information } = CryptoAssetStore;
  return (
    <View style={{ marginTop: 30 }}>
      <CryptoInformationCard asset={information} />
    </View>
  );
});
