import { observer } from 'mobx-react-lite';
import React from 'react';
import { CustomAssetInformationCard } from 'shared/components';
import { CustomAssetStore } from 'shared/stores';

export const Information = observer(() => {
  const { information } = CustomAssetStore;

  return <CustomAssetInformationCard asset={information} />;
});
