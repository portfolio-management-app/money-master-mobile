import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { ICurrencyAsset } from 'shared/models';
import { styleProvider } from 'shared/styles';

interface IProps {
  info: ICurrencyAsset;
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
    </TouchableOpacity>
  );
};
