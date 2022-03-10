import React from 'react';
import { SceneMap } from 'react-native-tab-view';
import { ScrollTabView } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { SCREEN_CONTENT } from '../constant';
import { CryptoMarket } from './Crypto';
import { CurrencyMarket } from './Currency';
import { GoldMarket } from './Gold';
import { StockMarket } from './Stock';

interface IProps {
  onViewChange?: (index: number) => void;
}

const Component = ({ onViewChange }: IProps) => {
  const [routes] = React.useState([
    { key: 'crypto', title: SCREEN_CONTENT.crypto },
    { key: 'stock', title: SCREEN_CONTENT.stock },
    { key: 'gold', title: SCREEN_CONTENT.gold },
    { key: 'currency', title: SCREEN_CONTENT.currency },
  ]);
  const renderScene = SceneMap({
    crypto: CryptoMarket,
    stock: StockMarket,
    gold: GoldMarket,
    currency: CurrencyMarket,
  });
  return (
    <ScrollTabView
      enableScroll
      onChangeView={onViewChange}
      tabWidth={130}
      indicatorStyle={{ backgroundColor: colorScheme.white }}
      style={{ backgroundColor: colorScheme.theme }}
      renderScene={renderScene}
      routes={routes}
    />
  );
};

export const TabBarView = React.memo(Component);
