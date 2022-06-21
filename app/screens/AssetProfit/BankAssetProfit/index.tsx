import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import {
  BankInformationCard,
  PlatformView,
  ProfitChart,
  ProfitRangeMenu,
  TransparentLoading,
} from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { BankAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const BankAssetProfit = observer(() => {
  const { getProfitLoss, profit, loading, information } = BankAssetStore;

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
      <BankInformationCard asset={information} />
      <ProfitChart chartData={getSnapshot(profit)} />
      <TransparentLoading show={loading} />
    </PlatformView>
  );
});
