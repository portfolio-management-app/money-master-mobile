import { imageSource } from 'assets/images';
import React from 'react';
import { View } from 'react-native';
import { Image } from 'react-native-ui-lib';
import { TextContainer } from '../text-container';
interface IProps {
  message: string;
}

export const NoData = ({ message }: IProps) => {
  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <Image width={150} height={150} source={imageSource.noData} />
      <TextContainer type="h4">{message}</TextContainer>
    </View>
  );
};
