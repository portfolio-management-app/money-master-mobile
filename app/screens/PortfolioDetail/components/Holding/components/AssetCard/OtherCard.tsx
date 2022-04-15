import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { ICustomAsset } from 'shared/models';
import { styleProvider, colorScheme } from 'shared/styles';
import { formatCurrency } from 'utils/number';

interface IProps {
  item: ICustomAsset;
}

export const OtherCard = ({ item }: IProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  const handlePress = () => {
    navigation.navigate('CustomAssetDetail', { info: item });
  };
  return (
    <TouchableOpacity onPress={handlePress} style={styleProvider.assetCard}>
      <View>
        <TextContainer>{item.name}</TextContainer>
        <TextContainer>{item.description}</TextContainer>
      </View>

      <TextContainer color={colorScheme.assetPrice}>
        {formatCurrency(item.inputMoneyAmount, item.inputCurrency)}
      </TextContainer>
    </TouchableOpacity>
  );
};
