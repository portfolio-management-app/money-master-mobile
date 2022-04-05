import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
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
  const navigation = useNavigation<MainStackNavigationProp>();

  const handlePress = () => {
    navigation.navigate('RealEstateAssetDetail', { info: item });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styleProvider.assetCard}>
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
