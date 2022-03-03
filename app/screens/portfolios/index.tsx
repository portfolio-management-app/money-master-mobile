import { observer } from 'mobx-react-lite';
import React from 'react';
import { StatusBar } from 'react-native';
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
import { PortfolioStore } from './store';

export const Portfolios = observer(() => {
  const { portfolioList } = PortfolioStore;

  return (
    <PlatformView style={styleProvider.body}>
      <FocusAwareStatusBar
        backgroundColor={colorScheme.bg}
        barStyle="dark-content"
      />
      <View style={styleProvider.container}>
        <SearchFilterBar />
        <SumUpCard />
        <ScrollView>
          {portfolioList.map((portfolio) => (
            <PortfolioCard
              id={portfolio.id}
              key={portfolio.id}
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
