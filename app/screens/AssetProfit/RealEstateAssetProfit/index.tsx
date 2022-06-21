import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import {
  PlatformView,
  ProfitChart,
  ProfitRangeMenu,
  RealEstateInformationCard,
  TransparentLoading,
} from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { RealEstateAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const RealEstateAssetProfit = observer(() => {
  const { getProfitLoss, profit, loading, information } = RealEstateAssetStore;

  React.useEffect(() => {
    getProfitLoss('day');
  }, [getProfitLoss]);
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${
          information.name
        } ${ASSET_DETAIL_CONTENT.profit.toLowerCase()}`}
        renderRightItem={
          <ProfitRangeMenu onSelect={(range) => getProfitLoss(range)} />
        }
      />
      <RealEstateInformationCard asset={information} />
      <ProfitChart chartData={getSnapshot(profit)} />
      <TransparentLoading show={loading} />
    </PlatformView>
  );
});
