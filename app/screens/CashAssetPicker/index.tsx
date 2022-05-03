import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';
import { PlatformView, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const CashAssetPicker = observer(() => {
  const { currencyAssetList } = PortfolioDetailStore;
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={APP_CONTENT.cashAssetPicker.title} />
      {currencyAssetList.map((currency) => (
        <TouchableOpacity style={styleProvider.card} key={currency.id}>
          <TextContainer>{currency.name}</TextContainer>
        </TouchableOpacity>
      ))}
    </PlatformView>
  );
});
