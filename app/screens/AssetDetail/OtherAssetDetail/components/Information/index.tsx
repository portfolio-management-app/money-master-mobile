import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { CustomAssetInformationCard } from 'shared/components';
import { CustomAssetStore } from 'shared/stores';

export const Information = observer(() => {
  const { information } = CustomAssetStore;

  return (
    <View style={{ marginTop: 30 }}>
      <CustomAssetInformationCard asset={information} />
    </View>
  );
});
