import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { PlatformView, TransparentLoading } from 'shared/components';
import { StockDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { ButtonGroup, Chart, DateRange } from './components';

export const StockDetail = observer(() => {
  const { stockInformation, timeSeries, loading } = StockDetailStore;
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={stockInformation.symbol} />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Chart
            stockInfo={stockInformation}
            chartData={getSnapshot(timeSeries)}
          />
          <DateRange />
        </View>
      </ScrollView>
      <TransparentLoading show={loading} />
      <ButtonGroup />
    </PlatformView>
  );
});
