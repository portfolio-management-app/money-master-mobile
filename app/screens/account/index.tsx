import { PlatformView, TextContainer } from 'components';
import React from 'react';
import { StatusBar } from 'react-native';
import { colorScheme } from 'styles';

export const Account = () => {
  return (
    <PlatformView>
      <StatusBar
        backgroundColor={colorScheme.white}
        barStyle={'dark-content'}
      />
      <TextContainer>Setting</TextContainer>
    </PlatformView>
  );
};
