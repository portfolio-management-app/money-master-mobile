import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';

interface IProps {
  id: number;
  name: string;
  description: string;
  value: number;
}

export const RealEasterCard = ({ id, name, description, value }: IProps) => {
  console.log('ASSET ID', id);
  return (
    <TouchableOpacity style={styleProvider.assetCard}>
      <View>
        <TextContainer>{name}</TextContainer>
        <TextContainer>{description}</TextContainer>
      </View>

      <TextContainer color={colorScheme.assetPrice}>${value}</TextContainer>
    </TouchableOpacity>
  );
};
