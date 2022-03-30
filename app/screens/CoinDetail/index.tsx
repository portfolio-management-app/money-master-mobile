import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { getSnapshot } from 'mobx-state-tree';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Chart, PlatformView, TransparentLoading } from 'shared/components';
import { CoinDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { ScreenParams } from 'shared/types';
import { ButtonGroup, CoinInfo, RangeMenu, Header } from './components';

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
      <NavigationHeader
        renderRightItem={() => <RangeMenu />}
        title={routeProps.params.name}
      />
      <Header />
      <Chart chartData={getSnapshot(chartData)} />

      <ScrollView>
        <View style={styleProvider.relativeView}>
          <CoinInfo />
          <TransparentLoading show={loading} />
        </View>
      </ScrollView>
      <ButtonGroup />
    </PlatformView>
  );
};

export const CoinDetail = observer(Component);
