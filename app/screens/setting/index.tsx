import React from 'react';
import RNRestart from 'react-native-restart';
import { UserStore } from 'shared/stores';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import { BaseButton, PlatformView, TextContainer } from 'shared/components';
import { styleProvider } from 'shared/styles';
import { AccountInfo, AppInfo, SettingList } from './components';
import { ScrollView } from 'react-native';

export const Setting = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <ScrollView>
        <AppInfo />
        <AccountInfo />
        <SettingList />
      </ScrollView>
    </PlatformView>
  );
};
