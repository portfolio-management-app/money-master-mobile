import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { View } from 'react-native-ui-lib';
import { PlatformView } from 'shared/components';
import { styleProvider } from 'shared/styles';
import {
  CreateModal,
  PortfolioCard,
  SearchFilterBar,
  SumUpCard,
} from './components';
import { PortfolioStore } from './store';

export const Portfolios = observer(() => {
  const { portfolioList } = PortfolioStore;

  return (
    <PlatformView style={styleProvider.body}>
      <View style={styleProvider.container}>
        <SearchFilterBar />
        <SumUpCard />
        <ScrollView>
          {portfolioList.map((portfolio) => (
            <PortfolioCard
              key={portfolio.name}
              name={portfolio.name}
              increase={portfolio.dailyIncrease}
              balance={portfolio.balance}
            />
          ))}
        </ScrollView>
      </View>
      <CreateModal />
    </PlatformView>
  );
});
