import { imageSource } from 'assets/images';
import React from 'react';
import { Image, View } from 'react-native-ui-lib';

export const SearchForData = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image width={300} height={300} source={imageSource.searchForData} />
    </View>
  );
};
