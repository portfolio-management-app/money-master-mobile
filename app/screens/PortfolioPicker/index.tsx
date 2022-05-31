import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import {
  Empty,
  PlatformView,
  Skeleton,
  SkeletonLoadable,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IPortfolio } from 'shared/models';
import { PortfolioDetailStore, PortfolioListStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.portfolioPicker;

export const PortfolioPicker = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const routeProps =
    useRoute<RootStackScreenProps<'PortfolioPicker'>['route']>();
  const { portfolioList, loading, getPortfolioList } = PortfolioListStore;
  const handlePortfolioPress = (portfolio: IPortfolio) => {
    PortfolioDetailStore.assignInfo(portfolio);
    const { actionType } = routeProps.params;
    switch (routeProps.params.type) {
      case 'CRYPTO':
        if (actionType === 'BUY') navigation.navigate('BuyCrypto');
        else navigation.navigate('SellCrypto');
        break;
      case 'STOCK':
        if (actionType === 'BUY') navigation.navigate('BuyStock');
        else navigation.navigate('SellStock');
        break;
      case 'CURRENCY':
        if (actionType === 'BUY') navigation.navigate('BuyCurrency');
        else navigation.navigate('SellCurrency');
        break;
    }
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <SkeletonLoadable
        loading={loading}
        isDataEmpty={portfolioList.length === 0}
        skeleton={<Skeleton times={5} />}
        dataComponent={
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => getPortfolioList()}
              />
            }
          >
            {portfolioList.map((portfolio) => (
              <TouchableOpacity
                onPress={() => handlePortfolioPress(portfolio)}
                key={portfolio.id}
                style={styleProvider.card}
              >
                <TextContainer>{portfolio.name}</TextContainer>
              </TouchableOpacity>
            ))}
          </ScrollView>
        }
        emptyComponent={<Empty />}
      />
    </PlatformView>
  );
});
