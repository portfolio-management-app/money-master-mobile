import React from 'react';
import { SceneMap } from 'react-native-tab-view';
import { ScrollTabView } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { SCREEN_CONTENT } from '../constants';
import { Brief } from './brief';
import { Holding } from './holding';
import { Note } from './note';
import { Payout } from './payout';
import { Report } from './report';

const renderScene = SceneMap({
  holding: Holding,
  brief: Brief,
  note: Note,
  payout: Payout,
  report: Report,
});

const TAB_CONTENT = SCREEN_CONTENT.tabs;

export const TabBarView = () => {
  const [routes] = React.useState([
    { key: 'holding', title: TAB_CONTENT.holding },
    { key: 'brief', title: TAB_CONTENT.brief },
    { key: 'report', title: TAB_CONTENT.report },
    { key: 'payout', title: TAB_CONTENT.payout },
    { key: 'note', title: TAB_CONTENT.note },
  ]);
  return (
    <ScrollTabView
      enableScroll
      tabWidth={110}
      indicatorStyle={{ backgroundColor: colorScheme.white }}
      style={{ backgroundColor: colorScheme.theme }}
      renderScene={renderScene}
      routes={routes}
    />
  );
};
