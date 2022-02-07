import { PlatformView, TextContainer } from 'components';
import React from 'react';
import { StatusBar } from 'react-native';
import { colorScheme } from 'styles';

export const Report = () => {
  return (
    <PlatformView>
      <StatusBar backgroundColor={colorScheme.bg} barStyle={'dark-content'} />
      <TextContainer>Report</TextContainer>
    </PlatformView>
  );
};
