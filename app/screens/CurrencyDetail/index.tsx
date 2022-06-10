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
import { CurrencyDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';
import { ButtonGroup, Chart, RangeMenu } from './components';

export const CurrencyDetail = observer(() => {
  const { chartData, loading, currencyInformation } = CurrencyDetailStore;
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        renderRightItem={<RangeMenu />}
        title={currencyInformation.s}
      />
      <ScrollView>
        <View style={{ flex: 1 }}>
          <View>
            <TextContainer
              color={colorScheme.blue200}
              textAl="center"
              bold
              type="h2"
            >
              {formatCurrency(
                parseFloat(currencyInformation.c),
                currencyInformation.s.split('/')[1]
              )}
            </TextContainer>
            <TextContainer
              textAl="center"
              color={
                currencyInformation.cp[0] === '+'
                  ? colorScheme.green300
                  : colorScheme.red500
              }
            >
              {currencyInformation.cp} (24h)
            </TextContainer>
          </View>
          <Chart chartData={getSnapshot(chartData)} />
        </View>
      </ScrollView>
      <TransparentLoading show={loading} />
      <ButtonGroup />
    </PlatformView>
  );
});
