import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';

interface IProps {
  id: number;
  name: string;
  description: string;
  value: number;
  rate: number;
}

export const CryptoCard = ({ id, name, description, value, rate }: IProps) => {
  return (
    <TouchableOpacity style={styleProvider.assetCard}>
      <View>
        <TextContainer>{name}</TextContainer>
        <TextContainer>{description}</TextContainer>
      </View>
      <View>
        <TextContainer color={colorScheme.assetPrice}>${value}</TextContainer>
        {rate > 0 ? (
          <TextContainer color={colorScheme.green300}>+{rate}</TextContainer>
        ) : (
          <TextContainer color={colorScheme.red500}>{rate}</TextContainer>
        )}
      </View>
    </TouchableOpacity>
  );
};
