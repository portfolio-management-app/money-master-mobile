import React from 'react';
import { BarIndicator } from 'react-native-indicators';
import { View } from 'react-native-ui-lib';
import { colorScheme, styleProvider } from 'shared/styles';
import { PlatformView } from '../platform-view';

export const GreetingLoading = () => {
  return (
    <PlatformView
      style={[
        styleProvider.body,
        {
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: 150,
        }}
      >
        <BarIndicator count={5} size={50} color={colorScheme.theme} />
      </View>
    </PlatformView>
  );
};
