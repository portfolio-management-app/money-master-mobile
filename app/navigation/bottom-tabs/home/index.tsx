import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenName } from 'navigation/screen-names';
import { Account, DashBoard, MarketCap, Portfolios } from 'screens';
import { colorScheme } from 'shared/styles';
import {
  AccountTab,
  MarketCapTab,
  PortfolioTab,
  DashBoardTab,
} from './components';
import { i18n } from 'i18n';
import { i18Key } from 'services/storage';

export const BottomTabLocale = i18n[i18Key].bottomTab;

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
          backgroundColor: colorScheme.white,
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
            return <AccountTab focused={focused} />;
          },
        }}
        name={screenName.account}
        component={Account}
      />
    </Tab.Navigator>
  );
};
