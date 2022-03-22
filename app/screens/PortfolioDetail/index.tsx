import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StatusBar } from 'react-native';
import { PlatformView } from 'shared/components';
import { PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { ScreenParams } from 'shared/types';
import { Header, Statistic, TabBarView } from './components';

interface Param extends ScreenParams {
  params: {
    id: number;
    name: string;
  };
}

export const PortfolioDetail = observer(() => {
  const routeProps = useRoute<Param>();

  React.useEffect(() => {
    PortfolioDetailStore.assignInfo(
      routeProps.params.id,
      routeProps.params.name
    );
    PortfolioDetailStore.getAllAsset();
  }, [routeProps]);

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.theme} barStyle="light-content" />
      <Header title={routeProps.params.name} />
      <Statistic />

      <TabBarView />
    </PlatformView>
  );
});
