import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';
import {
  Empty,
  PlatformView,
  Skeleton,
  SkeletonLoadable,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { ICashAsset } from 'shared/models';
import { CurrencyDetailStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.sellScreen;

export const SellCurrency = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { currencyInformation } = CurrencyDetailStore;
  const { getCurrencyByCode, doneLoadingCurrencyAsset, getCurrencyAsset } =
    PortfolioDetailStore;
  const filteredCurrency = getCurrencyByCode(
    currencyInformation.s.split('/')[0]
  );

  React.useEffect(() => {
    getCurrencyAsset();
  }, [getCurrencyAsset]);

  const handleSellToCash = (asset: ICashAsset) => {
    navigation.navigate('CashAssetPicker', {
      actionType: 'SELL',
      type: 'CASH',
      source: asset,
      transactionType: 'withdrawToCash',
      fromScreen: 'MARKET_CAP',
    });
  };

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.title} />
      <SkeletonLoadable
        loading={!doneLoadingCurrencyAsset}
        skeleton={<Skeleton times={5} />}
        isDataEmpty={filteredCurrency.length === 0}
        dataComponent={
          <>
            {filteredCurrency.map((currency) => (
              <TouchableOpacity
                onPress={() => handleSellToCash(currency)}
                style={styleProvider.card}
                key={currency.id}
              >
                <TextContainer>{currency.name}</TextContainer>
              </TouchableOpacity>
            ))}
          </>
        }
        emptyComponent={<Empty message={CONTENT.noAsset} />}
      />
    </PlatformView>
  );
});
