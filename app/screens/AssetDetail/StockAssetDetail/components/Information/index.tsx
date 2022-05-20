import { observer } from 'mobx-react-lite';
import React from 'react';
import { StockInformationCard } from 'shared/components';
import { StockAssetStore } from 'shared/stores';

export const Information = observer(() => {
  const { information } = StockAssetStore;
  return <StockInformationCard asset={information} />;
});
