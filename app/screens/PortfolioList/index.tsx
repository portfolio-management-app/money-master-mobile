import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native-ui-lib';
import { FocusAwareStatusBar, PlatformView } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import {
  CreateModal,
  PortfolioCard,
  SearchFilterBar,
  SumUpCard,
} from './components';
import { PortfolioListStore } from 'shared/stores';
import { RefreshControl } from 'react-native';

export const Portfolios = observer(() => {
  const { portfolioList, getPortfolioList, loading } = PortfolioListStore;
  React.useEffect(() => {
    getPortfolioList();
  }, [getPortfolioList]);

  return (
    <PlatformView style={styleProvider.body}>
      <FocusAwareStatusBar
        backgroundColor={colorScheme.bg}
        barStyle="dark-content"
      />

      <View style={styleProvider.container}>
        <SearchFilterBar />
        <SumUpCard />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => getPortfolioList()}
            />
          }
        >
          {portfolioList.map((portfolio) => (
            <PortfolioCard key={portfolio.id} item={portfolio} />
          ))}
        </ScrollView>
      </View>
      <CreateModal />
    </PlatformView>
  );
});
