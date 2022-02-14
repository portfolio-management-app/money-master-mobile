import { PlatformView, TextContainer } from 'shared/components';
import React from 'react';
import { StatusBar } from 'react-native';
import { colorScheme } from 'shared/styles';

export const Report = () => {
  return (
    <PlatformView>
      <StatusBar
        backgroundColor={colorScheme.white}
        barStyle={'dark-content'}
      />
      <TextContainer>Report</TextContainer>
    </PlatformView>
  );
};
