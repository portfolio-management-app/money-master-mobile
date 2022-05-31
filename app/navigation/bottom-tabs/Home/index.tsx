import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Setting, DashBoard, MarketCap, Portfolios } from 'screens';
import { colorScheme } from 'shared/styles';
import {
  SettingTab,
  MarketCapTab,
  PortfolioTab,
  DashBoardTab,
} from './components';
import { APP_CONTENT } from 'shared/constants';
import { BottomStackParamStack } from 'navigation/types';

export const BOTTOM_TAB_CONTENT = APP_CONTENT.bottomTab;

const Tab = createBottomTabNavigator<BottomStackParamStack>();

const Component = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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
        name="Dashboard"
        component={DashBoard}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <PortfolioTab focused={focused} />;
          },
        }}
        name="PortfolioList"
        component={Portfolios}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <MarketCapTab focused={focused} />;
          },
        }}
        name="MarketCap"
        component={MarketCap}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <SettingTab focused={focused} />;
          },
        }}
        name="Setting"
        component={Setting}
      />
    </Tab.Navigator>
  );
};

export const HomeBottomTab = React.memo(Component);
