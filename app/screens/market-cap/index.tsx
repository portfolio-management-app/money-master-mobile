import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TextContainer } from 'shared/components';

export const MarketCap = () => {
  return (
    <SafeAreaProvider>
      <TextContainer>Market cap</TextContainer>
    </SafeAreaProvider>
  );
};
