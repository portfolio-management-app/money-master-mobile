import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { IStockAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { calcPercent, formatCurrency } from 'utils/number';

interface IProps {
  item: IStockAsset;
}

export const StockCard = ({ item }: IProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const gotoDetail = () => {
    navigation.navigate('StockAssetDetail', { info: item });
  };
  return (
    <TouchableOpacity onPress={gotoDetail} style={styleProvider.assetCard}>
      <View>
        <TextContainer>{item.name}</TextContainer>
        <TextContainer>{item.description}</TextContainer>
      </View>
      <View>
        <TextContainer textAl="right" color={colorScheme.assetPrice}>
          {formatCurrency(item.purchasePrice, item.currencyCode)}
        </TextContainer>
        <TextContainer textAl="right" color={colorScheme.green300}>
          {formatCurrency(item.currentPrice, item.currencyCode)}{' '}
        </TextContainer>
      </View>
    </TouchableOpacity>
  );
};
