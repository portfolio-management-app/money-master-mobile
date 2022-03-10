import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-ui-lib';
import { Chart, PlatformView, TransparentLoading } from 'shared/components';
import { CoinDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { ScreenParams } from 'shared/types';
import { ButtonGroup, Header } from './components';

interface Param extends ScreenParams {
  params: {
    id: string;
    name: string;
    currency: string;
  };
}

const Component = () => {
  const routeProps = useRoute<Param>();
  const { chartData, loading, coinInfo } = CoinDetailStore;

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={routeProps.params.name} />
      <View style={[styleProvider.relativeView]}>
        <Header />
        <Chart
          currency={routeProps.params.currency}
          data={getSnapshot(chartData)}
        />
        <Image
          source={{ uri: coinInfo.image }}
          style={styleProvider.buttonIcon}
        />
        <TransparentLoading show={loading} />
      </View>
      <ButtonGroup />
    </PlatformView>
  );
};

export const CoinDetail = observer(Component);
