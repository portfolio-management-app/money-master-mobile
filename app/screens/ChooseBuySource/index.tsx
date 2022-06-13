import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Icon, PlatformView, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import {
  IBankAsset,
  ICashAsset,
  ICryptoAsset,
  ICustomAsset,
  IRealEstateAsset,
  IStockAsset,
} from 'shared/models';
import { SourceBuyStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.buySource;
const ICON_SIZE = 20;
const ML = 10;

export const ChooseBuySource = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const routeProps =
    useRoute<RootStackScreenProps<'ChooseBuySource'>['route']>();
  const navigateToCash = () => {
    navigation.navigate('CashAssetPicker', {
      actionType: 'BUY',
      source: routeProps.params.asset,
      type: routeProps.params.type,
      transactionType: 'buyFromCash',
      fromScreen: routeProps.params.fromScreen,
    });
  };

  const navigateToCreate = () => {
    navigation.navigate('CreateAsset', {
      props: {
        type: routeProps.params.type,
        name: routeProps.params.customAssetInfo?.name || '',
        id: routeProps.params.customAssetInfo?.id || 0,
      },
      transactionType: 'buyFromOutside',
    });
  };

  const handleNavigationFromAssetDetail = (isFromOutSide: boolean) => {
    if (!isFromOutSide) {
      navigateToCash();
      return;
    }
    switch (routeProps.params.type) {
      case 'crypto':
        navigation.navigate('AddCryptoAsset', {
          source: routeProps.params.asset as ICryptoAsset,
        });
        break;
      case 'stock':
        navigation.navigate('AddStockAsset', {
          source: routeProps.params.asset as IStockAsset,
        });
        break;
      case 'cash':
        navigation.navigate('AddCashAsset', {
          source: routeProps.params.asset as ICashAsset,
        });
        break;
      case 'bankSaving':
        navigation.navigate('AddBankAsset', {
          source: routeProps.params.asset as IBankAsset,
        });
        break;
      case 'custom':
        navigation.navigate('AddCustomAsset', {
          source: routeProps.params.asset as ICustomAsset,
        });
        break;
      case 'realEstate':
        navigation.navigate('AddRealEstateAsset', {
          source: routeProps.params.asset as IRealEstateAsset,
        });
        break;

      default:
        break;
    }
  };

  const handleNavigationFromMarketCap = (isFromOutSide: boolean) => {
    if (!isFromOutSide) {
      navigateToCash();
      return;
    }
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
  const handleBuyFromOutSide = () => {
    SourceBuyStore.changeSource(false, false, 0);
    SourceBuyStore.changeTransactionType('buyFromOutside');
    dispatchAction(true);
  };
  const handleBuyFromFund = () => {
    SourceBuyStore.changeSource(true, false, 0);
    SourceBuyStore.changeTransactionType('buyFromFund');
    dispatchAction(true);
  };
  const handleBuyFromCash = () => {
    SourceBuyStore.changeTransactionType('buyFromCash');
    dispatchAction(false);
  };
  const dispatchAction = (isFromOutSide: boolean) => {
    switch (routeProps.params.fromScreen) {
      case 'CREATE_NEW':
        if (isFromOutSide) {
          navigateToCreate();
        } else {
          navigateToCash();
        }
        break;
      case 'ASSET_DETAIL':
        handleNavigationFromAssetDetail(isFromOutSide);
        break;
      case 'MARKET_CAP':
        handleNavigationFromMarketCap(isFromOutSide);
        break;
    }
  };

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <TouchableOpacity onPress={handleBuyFromFund} style={styleProvider.card}>
        <Icon.MaterialCommunity
          name="sack"
          size={ICON_SIZE + 10}
          color={colorScheme.black200}
        />
        <TextContainer ml={ML}>{CONTENT.fund}</TextContainer>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBuyFromCash} style={styleProvider.card}>
        <Icon.FontAwesome5
          name="money-bill-wave-alt"
          size={ICON_SIZE}
          color={colorScheme.black200}
        />
        <TextContainer ml={ML + 5}>{CONTENT.cash}</TextContainer>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleBuyFromOutSide}
        style={styleProvider.card}
      >
        <Icon.Material
          name="money"
          size={ICON_SIZE + 10}
          color={colorScheme.black200}
        />
        <TextContainer ml={ML}>{CONTENT.outside}</TextContainer>
      </TouchableOpacity>
    </PlatformView>
  );
});
