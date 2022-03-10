import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import { Chart, PlatformView, TransparentLoading } from 'shared/components';
import { CoinDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { ScreenParams } from 'shared/types';

interface Param extends ScreenParams {
  params: {
    id: string;
    name: string;
    currency: string;
  };
}

const Component = () => {
  const routeProps = useRoute<Param>();
  const { chartData, loading } = CoinDetailStore;

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={routeProps.params.name} />
      <View style={[styleProvider.relativeView]}>
        <Chart
          currency={routeProps.params.currency}
          data={getSnapshot(chartData)}
        />
        <TransparentLoading show={loading} />
      </View>
    </PlatformView>
  );
};

export const CoinDetail = observer(Component);
