import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { ICashAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';

interface IProps {
  info: ICashAsset;
}

export const CashCard = ({ info }: IProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const gotoDetail = () => {
    navigation.navigate('CurrencyAssetDetail', { info: info });
  };
  return (
    <TouchableOpacity onPress={gotoDetail} style={styleProvider.assetCard}>
      <View>
        <TextContainer>{info.name}</TextContainer>
        <TextContainer>{info.description}</TextContainer>
      </View>
      <View>
        <TextContainer color={colorScheme.assetPrice}>
          {formatCurrency(info.amount, info.currencyCode)}
        </TextContainer>
      </View>
    </TouchableOpacity>
  );
};
