import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { IRealEstateAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';

interface IProps {
  item: IRealEstateAsset;
}

export const RealEstateCard = ({ item }: IProps) => {
  return (
    <TouchableOpacity style={styleProvider.assetCard}>
      <View>
        <TextContainer>{item.name}</TextContainer>
        <TextContainer>{item.description}</TextContainer>
      </View>

      <TextContainer color={colorScheme.assetPrice}>
        {formatCurrency(item.buyPrice, item.inputCurrency)}
      </TextContainer>
    </TouchableOpacity>
  );
};
