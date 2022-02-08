import { PlatformView } from 'components';
import React from 'react';
import { StatusBar } from 'react-native';
import { colorScheme, styleProvider } from 'styles';
import { LanguageSetting } from './components';

export const Account = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar
        backgroundColor={colorScheme.white}
        barStyle={'dark-content'}
      />
      <LanguageSetting />
    </PlatformView>
  );
};
