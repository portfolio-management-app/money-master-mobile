import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StatusBar } from 'react-native';
import { PlatformView } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { ScreenParams } from 'shared/types';
import { Header, Statistic, TabBarView } from './components';

type Param = ScreenParams & {
  params: {
    id: number;
    name: string;
  };
};

export const PortfolioDetail = () => {
  const routeProps = useRoute<Param>();

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.theme} barStyle="light-content" />
      <Header title={routeProps.params.name} />
      <Statistic />
      <TabBarView />
    </PlatformView>
  );
};