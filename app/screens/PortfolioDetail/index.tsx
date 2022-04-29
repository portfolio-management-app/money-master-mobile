import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { PlatformView } from 'shared/components';
import { InvestFundStore, PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { Header, TabBarView } from './components';

export const PortfolioDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'PortfolioDetail'>['route']>();

  React.useEffect(() => {
    PortfolioDetailStore.assignInfo(routeProps.params.info);
    InvestFundStore.assignPortfolioId(routeProps.params.info.id);
    PortfolioDetailStore.getAllAsset();
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
