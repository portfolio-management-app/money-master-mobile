import { useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { IBankAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';

interface IProps {
  item: IBankAsset;
}

export const BankingCard = ({ item }: IProps) => {
  const navigation = useNavigation();

  const gotoBankDetail = () => {
    navigation.navigate(
      screenName.bankAssetDetail as never,
      { info: item } as never
    );
  };
  return (
    <TouchableOpacity onPress={gotoBankDetail} style={styleProvider.assetCard}>
      <View>
        <TextContainer>{item.name}</TextContainer>
        <TextContainer>{item.description}</TextContainer>
      </View>
      <View>
        <TextContainer color={colorScheme.assetPrice}>
          {formatCurrency(item.inputMoneyAmount, item.inputCurrency)}
        </TextContainer>
      </View>
    </TouchableOpacity>
  );
};
