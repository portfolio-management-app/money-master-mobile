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
      <Image
        width={300}
        height={300}
        assetGroup="nodata"
        assetName="searchForData"
      />
    </View>
  );
};
