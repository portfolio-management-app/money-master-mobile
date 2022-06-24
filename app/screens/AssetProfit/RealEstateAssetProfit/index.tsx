import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import {
  PlatformView,
  ProfitChart,
  ProfitRangeMenu,
  RealEstateInformationCard,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { RealEstateAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';

export const RealEstateAssetProfit = observer(() => {
  const { getProfitLoss, profit, loading, information } = RealEstateAssetStore;

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
  console.log(profit);
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${APP_CONTENT.profit.header} ${information.name}`}
        renderRightItem={
          <ProfitRangeMenu onSelect={(range) => getProfitLoss(range)} />
        }
      />
      <RealEstateInformationCard profit={currentProfit} asset={information} />
      <ProfitChart chartData={profit} />

      <TransparentLoading show={loading} />
    </PlatformView>
  );
});
