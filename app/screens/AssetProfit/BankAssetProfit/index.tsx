import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import {
  BankInformationCard,
  PlatformView,
  ProfitActionButtons,
  ProfitChart,
  ProfitRangeMenu,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { BankAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const BankAssetProfit = observer(() => {
  const { getProfitLoss, profit, loading, information } = BankAssetStore;
  const navigation = useNavigation<MainStackNavigationProp>();
  React.useEffect(() => {
    getProfitLoss('day');
  }, [getProfitLoss]);
  const handleAdd = () => {
    navigation.navigate('ChooseBuySource', {
      fromScreen: 'ASSET_DETAIL',
      asset: information,
      type: 'crypto',
    });
  };

  const handleSell = () => {
    navigation.navigate('CashAssetPicker', {
      source: information,
      actionType: 'SELL',
      type: 'crypto',
      transactionType: 'withdrawToCash',
      fromScreen: 'ASSET_DETAIL',
    });
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={`${APP_CONTENT.profit.header} ${information.name}`}
        renderRightItem={
          <ProfitRangeMenu onSelect={(range) => getProfitLoss(range)} />
        }
      />
      <BankInformationCard asset={information} />
      <ProfitChart chartData={getSnapshot(profit)} />
      <ProfitActionButtons onAddValue={handleAdd} onSell={handleSell} />
      <TransparentLoading show={loading} />
    </PlatformView>
  );
});
