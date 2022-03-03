import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenName } from 'navigation/screen-names';
import { Setting, DashBoard, MarketCap, Portfolios } from 'screens';
import { colorScheme } from 'shared/styles';
import {
  SettingTab,
  MarketCapTab,
  PortfolioTab,
  DashBoardTab,
} from './components';
import { APP_CONTENT } from 'shared/constants';

export const BOTTOM_TAB_CONTENT = APP_CONTENT.bottomTab;

const Tab = createBottomTabNavigator();

export const HomeBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={screenName.dashBoard}
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          backgroundColor: colorScheme.bg,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <DashBoardTab focused={focused} />;
          },
        }}
        name={screenName.dashBoard}
        component={DashBoard}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <PortfolioTab focused={focused} />;
          },
        }}
        name={screenName.portfolio}
        component={Portfolios}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <MarketCapTab focused={focused} />;
          },
        }}
        name={screenName.marketCap}
        component={MarketCap}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <SettingTab focused={focused} />;
          },
        }}
        name={screenName.setting}
        component={Setting}
      />
    </Tab.Navigator>
  );
};
