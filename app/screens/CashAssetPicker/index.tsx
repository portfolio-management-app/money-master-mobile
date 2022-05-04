import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import {
  Empty,
  PlatformView,
  Skeleton,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const CashAssetPicker = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'CashAssetPicker'>['route']>();
  const { currencyAssetList, getCurrencyAsset, doneLoadingCurrencyAsset } =
    PortfolioDetailStore;

  React.useEffect(() => {
    getCurrencyAsset();
  }, [getCurrencyAsset]);

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={APP_CONTENT.cashAssetPicker.title} />
      {!doneLoadingCurrencyAsset ? (
        <Skeleton times={5} />
      ) : (
        <>
          {currencyAssetList.length ? (
            <ScrollView>
              {currencyAssetList.map((currency) => (
                <TouchableOpacity style={styleProvider.card} key={currency.id}>
                  <TextContainer>{currency.name}</TextContainer>
                </TouchableOpacity>
              ))}
            </ScrollView>
          ) : (
            <Empty />
          )}
        </>
      )}
    </PlatformView>
  );
});
