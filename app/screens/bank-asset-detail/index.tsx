import React from 'react';
import { StatusBar } from 'react-native';
import { PlatformView, SpeedDial } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { SpeedDialButtons } from './components';

export const BankAssetDetail = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <SpeedDial renderItems={() => <SpeedDialButtons />} />
    </PlatformView>
  );
};
