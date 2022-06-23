import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import {
  CustomAssetInformationCard,
  PlatformView,
  ProfitActionButtons,
  ProfitChart,
  ProfitRangeMenu,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CustomAssetStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const CustomAssetProfit = observer(() => {
  const { getProfitLoss, profit, loading, information } = CustomAssetStore;

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
      <CustomAssetInformationCard asset={information} />
      <ProfitChart chartData={getSnapshot(profit)} />
      <ProfitActionButtons onAddValue={handleAdd} onSell={handleSell} />
      <TransparentLoading show={loading} />
    </PlatformView>
  );
});
