import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { PlatformView } from 'shared/components';
import {
  InvestFundStore,
  PortfolioDetailStore,
  BankAssetStore,
  CryptoAssetStore,
  StockAssetStore,
  CashAssetStore,
  CustomAssetStore,
  RealEstateAssetStore,
} from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { Header, TabBarView } from './components';

export const PortfolioDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'PortfolioDetail'>['route']>();

  React.useEffect(() => {
    const { id } = routeProps.params.info;
    PortfolioDetailStore.assignInfo(routeProps.params.info);
    PortfolioDetailStore.getAllAsset();
    InvestFundStore.assignPortfolioId(id);
    BankAssetStore.assignPortfolioId(id);
    CryptoAssetStore.assignPortfolioId(id);
    StockAssetStore.assignPortfolioId(id);
    CustomAssetStore.assignPortfolioId(id);
    RealEstateAssetStore.assignPortfolioId(id);
    CashAssetStore.assignPortfolioId(id);
    InvestFundStore.getFund();
    return () => PortfolioDetailStore.cleanUp();
  }, [routeProps]);

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.theme} barStyle="light-content" />
      <Header title={routeProps.params.info.name} />
      <TabBarView />
    </PlatformView>
  );
});
