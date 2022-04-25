import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { PlatformView } from 'shared/components';
import { PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { Header, TabBarView } from './components';

export const PortfolioDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'PortfolioDetail'>['route']>();

  React.useEffect(() => {
    PortfolioDetailStore.assignInfo(
      routeProps.params.id,
      routeProps.params.name
    );
    PortfolioDetailStore.getAllAsset();
    return () => PortfolioDetailStore.cleanUp();
  }, [routeProps]);

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.theme} barStyle="light-content" />
      <Header title={routeProps.params.name} />
      {/* <Statistic /> */}

      <TabBarView />
    </PlatformView>
  );
});
