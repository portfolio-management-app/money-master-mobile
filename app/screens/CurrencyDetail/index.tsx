import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { PlatformView, TransparentLoading } from 'shared/components';
import { CurrencyDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { ButtonGroup, Chart, DateRange } from './components';

export const CurrencyDetail = observer(() => {
  const { chartData, loading, currencyInformation } = CurrencyDetailStore;
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={currencyInformation.symbol} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Chart chartData={getSnapshot(chartData)} />
          <DateRange />
        </View>
      </ScrollView>
      <TransparentLoading show={loading} />
      <ButtonGroup />
    </PlatformView>
  );
});
