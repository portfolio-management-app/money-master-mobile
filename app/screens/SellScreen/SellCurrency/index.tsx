import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import {
  Empty,
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CurrencyDetailStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.sellScreen;

export const SellCurrency = observer(() => {
  const { currencyInformation } = CurrencyDetailStore;
  const { getCurrencyByCode, doneLoadingCurrencyAsset, getCurrencyAsset } =
    PortfolioDetailStore;
  const filteredCurrency = getCurrencyByCode(
    currencyInformation.s.split('/')[0]
  );

  React.useEffect(() => {
    getCurrencyAsset();
  }, [getCurrencyAsset]);
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.title} />
      {filteredCurrency.length === 0 && doneLoadingCurrencyAsset && (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Empty message={CONTENT.noAsset} />
        </View>
      )}
      {filteredCurrency.map((coin) => (
        <TouchableOpacity style={styleProvider.card} key={coin.id}>
          <TextContainer>{coin.name}</TextContainer>
        </TouchableOpacity>
      ))}
      <TransparentLoading show={!doneLoadingCurrencyAsset} />
    </PlatformView>
  );
});
