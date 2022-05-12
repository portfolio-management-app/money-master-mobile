import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import {
  Empty,
  PlatformView,
  Skeleton,
  SkeletonLoadable,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import {
  IBankAsset,
  ICryptoAsset,
  ICurrencyAsset,
  IRealEstateAsset,
  IStockAsset,
} from 'shared/models';
import { PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const CashAssetPicker = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'CashAssetPicker'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const { currencyAssetList, getCurrencyAsset, doneLoadingCurrencyAsset } =
    PortfolioDetailStore;

  const filteredCash = useMemo(() => {
    if (routeProps.params.type === 'CASH') {
      return currencyAssetList.filter(
        (e) => e.id !== routeProps.params.source.id
      );
    }
    return currencyAssetList;
  }, [currencyAssetList, routeProps]);

  React.useEffect(() => {
    getCurrencyAsset();
  }, [getCurrencyAsset]);

  const handleCashPress = (cash: ICurrencyAsset) => {
    switch (routeProps.params.type) {
      case 'CRYPTO':
        navigation.navigate('DrawCrypto', {
          source: routeProps.params.source as ICryptoAsset,
          cashDestination: cash,
        });
        break;
      case 'STOCK':
        navigation.navigate('DrawStock', {
          source: routeProps.params.source as IStockAsset,
          cashDestination: cash,
        });
        break;
      case 'CASH':
        navigation.navigate('DrawCash', {
          source: routeProps.params.source as ICurrencyAsset,
          cashDestination: cash,
        });
        break;
      case 'BANKING':
        navigation.navigate('DrawBank', {
          source: routeProps.params.source as IBankAsset,
          cashDestination: cash,
        });
        break;
      case 'REAL-ESTATE':
        navigation.navigate('DrawRealEstate', {
          source: routeProps.params.source as IRealEstateAsset,
          cashDestination: cash,
        });
        break;
    }
  };

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={APP_CONTENT.cashAssetPicker.title} />
      <SkeletonLoadable
        loading={!doneLoadingCurrencyAsset}
        isDataEmpty={filteredCash.length === 0}
        skeleton={<Skeleton times={5} />}
        dataComponent={
          <ScrollView>
            {filteredCash.map((currency) => (
              <TouchableOpacity
                onPress={() => handleCashPress(currency)}
                style={styleProvider.card}
                key={currency.id}
              >
                <TextContainer>{currency.name}</TextContainer>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }
        emptyComponent={
          <View style={styleProvider.flexCenter}>
            <Empty />
          </View>
        }
      />
    </PlatformView>
  );
});
