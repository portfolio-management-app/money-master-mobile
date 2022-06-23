import React from 'react';
import { SceneMap } from 'react-native-tab-view';
import { ScrollTabView } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { colorScheme, dimensionProvider } from 'shared/styles';
import { Information } from './Information';
import { Transaction } from './Transaction';

interface IProps {
  onViewChange?: (index: number) => void;
}

const Component = ({ onViewChange }: IProps) => {
  const [routes] = React.useState([
    { key: 'information', title: ASSET_DETAIL_CONTENT.information },
    { key: 'transaction', title: ASSET_DETAIL_CONTENT.transaction },
  ]);
  const renderScene = SceneMap({
    information: Information,
    transaction: Transaction,
  });
  return (
    <ScrollTabView
      style={{ backgroundColor: colorScheme.white }}
      activeColor={colorScheme.theme}
      inactiveColor={colorScheme.black200}
      indicatorStyle={{ backgroundColor: colorScheme.theme }}
      enableScroll
      onChangeView={onViewChange}
      renderScene={renderScene}
      routes={routes}
      tabWidth={dimensionProvider.width / 2}
    />
  );
};

export const TabBarView = React.memo(Component);
