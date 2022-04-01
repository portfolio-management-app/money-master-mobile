import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { TextContainer } from 'shared/components';
import { CoinDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';

export const Header = observer(() => {
  const { coinInfo, currency } = CoinDetailStore;
  const renderCurrentPrice = formatCurrency(
    coinInfo.currentPrice.get(currency.toLowerCase()) || 0,
    currency
  );
  const renderPriceChangePercent =
    coinInfo.priceChangePercent.get(currency.toLowerCase()) || 0;

  return (
    <View style={styleProvider.centerVertical}>
      <TextContainer mb={10} color={colorScheme.blue300} type="h1" bold>
        {renderCurrentPrice}
      </TextContainer>

      <TextContainer
        color={
          renderPriceChangePercent > 0
            ? colorScheme.green300
            : colorScheme.red500
        }
      >
        ({renderPriceChangePercent > 0 && '+'}
        {renderPriceChangePercent}%)
      </TextContainer>
    </View>
  );
});
