import React from 'react';
import { SceneMap } from 'react-native-tab-view';
import { ScrollTabView } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { SCREEN_CONTENT } from '../constants';
import { Brief } from './Brief';
import { Holding } from './Holding';
import { InvestFund } from './InvestFund';
import { Note } from './Note';
import { Payout } from './Payout';
import { Report } from './Report';

const TAB_CONTENT = SCREEN_CONTENT.tabs;

interface IProps {
  onChangeView?: (index: number) => void;
}

const Component = ({ onChangeView }: IProps) => {
  const [routes] = React.useState([
    { key: 'holding', title: TAB_CONTENT.holding },
    { key: 'investFund', title: TAB_CONTENT.investFund },
    { key: 'brief', title: TAB_CONTENT.brief },
    { key: 'report', title: TAB_CONTENT.report },
    { key: 'payout', title: TAB_CONTENT.payout },
    { key: 'note', title: TAB_CONTENT.note },
  ]);
  const renderScene = SceneMap({
    holding: Holding,
    brief: Brief,
    investFund: InvestFund,
    note: Note,
    payout: Payout,
    report: Report,
  });
  return (
    <ScrollTabView
      onChangeView={onChangeView}
      enableScroll
      tabWidth={110}
      indicatorStyle={{ backgroundColor: colorScheme.white }}
      style={{ backgroundColor: colorScheme.theme }}
      renderScene={renderScene}
      routes={routes}
    />
  );
};

export const TabBarView = React.memo(Component);
