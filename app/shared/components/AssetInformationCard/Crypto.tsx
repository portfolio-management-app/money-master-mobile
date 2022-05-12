import React from 'react';
import { View } from 'react-native';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICryptoAsset } from 'shared/models';
import { styleProvider, colorScheme } from 'shared/styles';
import { calcPercent, formatCurrency } from 'utils/number';
import { TextContainer } from '../TextContainer';

interface IProps {
  asset: ICryptoAsset;
}

export const CryptoInformationCard = ({ asset }: IProps) => {
  const percent = calcPercent(asset.currentPrice, asset.purchasePrice);
  return (
    <View style={styleProvider.centerVertical}>
      <View>
        <TextContainer bold type="h1" color={colorScheme.theme}>
          {formatCurrency(asset.currentPrice, asset.currencyCode)}
        </TextContainer>
        <View style={[styleProvider.centerHorizontal, { marginTop: 10 }]}>
          <TextContainer type="small">
            {ASSET_DETAIL_CONTENT.buyPrice}:{' '}
          </TextContainer>
          <TextContainer type="small" color={colorScheme.green300}>
            {formatCurrency(asset.purchasePrice, asset.currencyCode)}
          </TextContainer>
        </View>
        <View style={[styleProvider.centerHorizontal, { marginTop: 10 }]}>
          <TextContainer type="small">
            {ASSET_DETAIL_CONTENT.profit}:{' '}
          </TextContainer>
          <TextContainer
            type="small"
            color={percent > 0 ? colorScheme.green300 : colorScheme.red500}
          >
            {percent > 0 && '+'}
            {percent}%
          </TextContainer>
        </View>
        <View style={[styleProvider.centerHorizontal, { marginTop: 10 }]}>
          <TextContainer type="small">
            {ASSET_DETAIL_CONTENT.description}:{' '}
          </TextContainer>
          <TextContainer type="small">{asset.description}</TextContainer>
        </View>
        <View style={[styleProvider.centerHorizontal, { marginTop: 10 }]}>
          <TextContainer type="small">
            {ASSET_DETAIL_CONTENT.amountHolding}:{' '}
          </TextContainer>
          <TextContainer type="small">
            {asset.currentAmountHolding}
          </TextContainer>
        </View>
      </View>
    </View>
  );
};
