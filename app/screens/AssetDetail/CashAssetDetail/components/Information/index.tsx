import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { CashInformationCard } from 'shared/components';
import { CashAssetStore } from 'shared/stores';

export const Information = observer(() => {
  const { information } = CashAssetStore;

  return (
    <View style={{ marginTop: 30 }}>
      <CashInformationCard asset={information} />
    </View>
  );
});
