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
import { APP_CONTENT } from 'shared/constants';
import { BankAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';

export const BankAssetProfit = observer(() => {
  const { getProfitLoss, profit, loading, information } = BankAssetStore;

  React.useEffect(() => {
    getProfitLoss('day');
  }, [getProfitLoss]);

  const currentProfit =
    profit.length > 0
      ? formatCurrency(
          profit[profit.length - 1].amount,
          information.inputCurrency
        )
      : formatCurrency(0, information.inputCurrency);
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${APP_CONTENT.profit.header} ${information.name}`}
        renderRightItem={
          <ProfitRangeMenu onSelect={(range) => getProfitLoss(range)} />
        }
      />
      <BankInformationCard profit={currentProfit} asset={information} />
      <ProfitChart chartData={getSnapshot(profit)} />

      <TransparentLoading show={loading} />
    </PlatformView>
  );
});
