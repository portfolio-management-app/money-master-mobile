import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { screenName } from 'navigation/screen-names';
import { Account, AssetCategory, Report, Wallet } from 'screens';
import {
  AccountTab,
  AssetCategoryTab,
  ReportTab,
  TransactionTab,
} from './components';
import { colorScheme } from 'shared/styles';

const Tab = createBottomTabNavigator();

export const HomeBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName={screenName.transaction}
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
            return <TransactionTab focused={focused} />;
          },
        }}
        name={screenName.transaction}
        component={Wallet}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <AssetCategoryTab focused={focused} />;
          },
        }}
        name={screenName.category}
        component={AssetCategory}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ focused }) => {
            return <ReportTab focused={focused} />;
          },
        }}
        name={screenName.report}
        component={Report}
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
