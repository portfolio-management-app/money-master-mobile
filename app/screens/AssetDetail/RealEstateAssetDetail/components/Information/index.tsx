import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { RealEstateInformationCard } from 'shared/components';
import { RealEstateAssetStore } from 'shared/stores';

export const Information = observer(() => {
  const { information } = RealEstateAssetStore;

  return (
    <View style={{ marginTop: 30 }}>
      <RealEstateInformationCard asset={information} />
    </View>
  );
});
