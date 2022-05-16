import { useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { PlatformView } from 'shared/components';
import { InvestFundStore, PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { assignPortfolioIdToAssetStore } from 'utils/store';
import { Header, TabBarView } from './components';

export const PortfolioDetail = observer(() => {
  const routeProps =
    useRoute<RootStackScreenProps<'PortfolioDetail'>['route']>();

  const ref = React.useRef({
    isFetchInvestFund: false,
    isFetchedPieChart: false,
  });

  React.useEffect(() => {
    const { id } = routeProps.params.info;
    PortfolioDetailStore.assignInfo(routeProps.params.info);
    PortfolioDetailStore.getAllAsset();
    InvestFundStore.assignPortfolioId(id);
    assignPortfolioIdToAssetStore(id);
    return () => PortfolioDetailStore.cleanUp();
  }, [routeProps]);

  const handleViewChange = (index: number) => {
    switch (index) {
      case 1:
        console.log(ref.current);
        if (!ref.current.isFetchInvestFund) {
          InvestFundStore.getFund();
          InvestFundStore.getTransactionList();
          ref.current.isFetchInvestFund = true;
        }
        break;
      case 2:
        if (!ref.current.isFetchedPieChart) {
          PortfolioDetailStore.getPieChart();
          ref.current.isFetchedPieChart = true;
        }

        break;
    }
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.theme} barStyle="light-content" />
      <Header title={routeProps.params.info.name} />
      <TabBarView onChangeView={handleViewChange} />
    </PlatformView>
  );
});
