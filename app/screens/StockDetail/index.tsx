import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { StockDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';
import { ButtonGroup, Chart, RangeMenu } from './components';

export const StockDetail = observer(() => {
  const { stockInformation, timeSeries, loading, symbol } = StockDetailStore;
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader renderRightItem={() => <RangeMenu />} title={symbol} />
      <TextContainer bold textAl="center" type="h2" color={colorScheme.blue200}>
        {formatCurrency(stockInformation.c, 'USD')}
      </TextContainer>
      <TextContainer
        textAl="center"
        color={
          stockInformation.d > 0 ? colorScheme.green300 : colorScheme.red500
        }
      >
        {stockInformation.d > 0
          ? `+${stockInformation.dp}`
          : stockInformation.dp}
        % (24h)
      </TextContainer>
      <ScrollView>
        <View style={{ flex: 1 }}>
          <Chart
            stockInfo={stockInformation}
            chartData={getSnapshot(timeSeries)}
          />
        </View>
      </ScrollView>
      <TransparentLoading show={loading} />
      <ButtonGroup />
    </PlatformView>
  );
});
