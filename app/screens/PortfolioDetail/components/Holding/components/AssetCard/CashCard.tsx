import React from 'react';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { Information } from 'screens/AssetDetail/CryptoAssetDetail/components';
import { TextContainer } from 'shared/components';
import { ICurrencyAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';

interface IProps {
  info: ICurrencyAsset;
}

export const CashCard = ({ info }: IProps) => {
  return (
    <TouchableOpacity style={styleProvider.assetCard}>
      <View>
        <TextContainer>{info.name}</TextContainer>
        <TextContainer>{info.description}</TextContainer>
      </View>
    </TouchableOpacity>
  );
};
