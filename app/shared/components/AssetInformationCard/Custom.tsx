import React from 'react';
import { View } from 'react-native';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICustomAsset } from 'shared/models';
import { styleProvider, colorScheme } from 'shared/styles';
import { formatCurrency } from 'utils/number';
import { TextContainer } from '../TextContainer';
interface IProps {
  asset: ICustomAsset;
}
export const CustomAssetInformationCard = ({ asset }: IProps) => {
  return (
    <View style={styleProvider.centerVertical}>
      <View>
        <TextContainer mb={10} color={colorScheme.theme} bold type="h1">
          {formatCurrency(asset.inputMoneyAmount, asset.inputCurrency)}
        </TextContainer>
        <TextContainer mb={10} type="small">
          {ASSET_DETAIL_CONTENT.name}: {asset.name}
        </TextContainer>
        <TextContainer mb={10} type="small">
          {ASSET_DETAIL_CONTENT.description}:{' '}
          {asset.description === ''
            ? ASSET_DETAIL_CONTENT.none
            : asset.description}
        </TextContainer>
      </View>
    </View>
  );
};
