import React from 'react';
import { Platform, SafeAreaView, View, ViewProps } from 'react-native';

export const PlatformView = (props: ViewProps) => {
  const { children, style, ...res } = props;
  if (Platform.OS == 'ios')
    return (
      <SafeAreaView {...res} style={style}>
        {children}
      </SafeAreaView>
    );
  else
    return (
      <View {...res} style={style}>
        {children}
      </View>
    );
};
