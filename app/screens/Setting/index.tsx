import React from 'react';
import { PlatformView } from 'shared/components';
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
