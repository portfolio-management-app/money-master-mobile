import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { BankInformationCard } from 'shared/components';
import { BankAssetStore } from 'shared/stores';

export const Information = observer(() => {
  const { information } = BankAssetStore;

  return (
    <View style={{ marginTop: 30 }}>
      <BankInformationCard asset={information} />
    </View>
  );
});
