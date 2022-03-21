import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { TextContainer, TransparentLoading } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';
import { Filter } from './components';
import { MetalStore } from './store';

const CONTENT = APP_CONTENT.marketCap;

export const MetalMarket = observer(() => {
  const { information, getMetalData } = MetalStore;

  const { xauPrice, xagPrice, curr } = information.items[0];
  return (
    <View style={styleProvider.relativeView}>
      <Filter onChange={(val) => getMetalData(val)} />
      <TransparentLoading show={MetalStore.loading} />

      <View style={styleProvider.card}>
        <View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.gold}: </TextContainer>
            <TextContainer color={colorScheme.blue200}>
              {formatCurrency(xauPrice, curr)}/spot
            </TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>
            <TextContainer>
              {parseToString(new Date(information.ts))}
            </TextContainer>
          </View>
        </View>
      </View>
      <View style={styleProvider.card}>
        <View>
          <View style={[styleProvider.centerHorizontal, { paddingBottom: 10 }]}>
            <TextContainer bold>{CONTENT.silver}: </TextContainer>
            <TextContainer color={colorScheme.blue200}>
              {formatCurrency(xagPrice, curr)}/spot
            </TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>
            <TextContainer>
              {parseToString(new Date(information.ts))}
            </TextContainer>
          </View>
        </View>
      </View>
    </View>
  );
});
