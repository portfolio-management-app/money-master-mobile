import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { TextContainer } from 'shared/components';
import { CoinDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';

export const Header = observer(() => {
  const { coinInfo, currency } = CoinDetailStore;

  return (
    <View style={styleProvider.centerVertical}>
      <TextContainer mb={10} color={colorScheme.blue300} type="h1" bold>
        {formatCurrency(coinInfo.currentPrice, currency)}
      </TextContainer>

      <TextContainer
        color={
          coinInfo.priceChangePercent > 0
            ? colorScheme.green300
            : colorScheme.red500
        }
      >
        ({coinInfo.priceChangePercent > 0 && '+'}
        {coinInfo.priceChangePercent}%)
      </TextContainer>
    </View>
  );
});