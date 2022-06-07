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
  ICashAsset,
  ICustomAsset,
  IRealEstateAsset,
  IStockAsset,
} from 'shared/models';
import { PortfolioDetailStore, SourceBuyStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

export const CashAssetPicker = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'CashAssetPicker'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const { currencyAssetList, getCurrencyAsset, doneLoadingCurrencyAsset } =
    PortfolioDetailStore;

  const filteredCash = useMemo(() => {
    if (routeProps.params.type === 'cash') {
      return currencyAssetList.filter(
        (e) => e.id !== routeProps.params.source?.id
      );
    }
    return currencyAssetList;
  }, [currencyAssetList, routeProps]);

  React.useEffect(() => {
    getCurrencyAsset();
  }, [getCurrencyAsset]);

  const navigateToCreate = () => {
    navigation.navigate('CreateAsset', {
      props: {
        type: routeProps.params.type,
        name: routeProps.params.customAssetInfo?.name || '',
        id: routeProps.params.customAssetInfo?.id || 0,
      },
      transactionType: routeProps.params.transactionType,
    });
  };
  const navigateToSell = (cash: ICashAsset) => {
    switch (routeProps.params.type) {
      case 'crypto':
        navigation.navigate('CryptoSellToCash', {
          source: routeProps.params.source as ICryptoAsset,
          cashDestination: cash,
        });
        break;
      case 'stock':
        navigation.navigate('StockSellToCash', {
          source: routeProps.params.source as IStockAsset,
          cashDestination: cash,
        });
        break;
      case 'cash':
        navigation.navigate('CashSellToCash', {
          source: routeProps.params.source as ICashAsset,
          cashDestination: cash,
        });
        break;
      case 'bankSaving':
        navigation.navigate('BankSellToCash', {
          source: routeProps.params.source as IBankAsset,
          cashDestination: cash,
        });
        break;
      case 'realEstate':
        navigation.navigate('RealEstateSellToCash', {
          source: routeProps.params.source as IRealEstateAsset,
          cashDestination: cash,
        });
        break;
      case 'custom':
        navigation.navigate('CustomSellToCash', {
          source: routeProps.params.source as ICustomAsset,
          cashDestination: cash,
        });
        break;
    }
  };

  const navigateToBuy = () => {
    switch (routeProps.params.type) {
      case 'crypto':
        navigation.navigate('BuyCrypto', {
          transactionType: SourceBuyStore.singleAssetTransactionType,
        });

        break;
      case 'stock':
        navigation.navigate('BuyStock', {
          transactionType: SourceBuyStore.singleAssetTransactionType,
        });
        break;
      case 'cash':
        navigation.navigate('BuyCash', {
          transactionType: SourceBuyStore.singleAssetTransactionType,
        });
        break;
      default:
        break;
    }
  };

  const handleCashPress = (cash: ICashAsset) => {
    if (routeProps.params.actionType === 'SELL') {
      navigateToSell(cash);
      return;
    }
    SourceBuyStore.changeSource(false, true, cash.id);
    switch (routeProps.params.fromScreen) {
      case 'MARKET_CAP':
        navigateToBuy();
        break;
      case 'CREATE_NEW':
        navigateToCreate();
        break;
      default:
        break;
    }
  };

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader
        title={
          routeProps.params.actionType === 'SELL'
            ? APP_CONTENT.cashAssetPicker.title
            : APP_CONTENT.cashAssetPicker.titleBuy
        }
      />
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
