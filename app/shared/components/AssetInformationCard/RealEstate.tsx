import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { APP_CONTENT, ASSET_DETAIL_CONTENT } from 'shared/constants';
import { IRealEstateAsset } from 'shared/models';
import { styleProvider, colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';
import { TextContainer } from '../TextContainer';

interface IProps {
  asset: IRealEstateAsset;
}
export const RealEstateInformationCard = observer(({ asset }: IProps) => {
  return (
    <View style={styleProvider.centerVertical}>
      <View>
        <TextContainer mb={10} color={colorScheme.theme} bold type="h1">
          {formatCurrency(asset.inputMoneyAmount, asset.inputCurrency)}
        </TextContainer>
        <TextContainer mb={10} type="small">
          {ASSET_DETAIL_CONTENT.realEstateName}: {asset.name}
        </TextContainer>
        <TextContainer mb={10} type="small">
          {ASSET_DETAIL_CONTENT.description}:{' '}
          {asset.description === ''
            ? ASSET_DETAIL_CONTENT.none
            : asset.description}
        </TextContainer>
        <TextContainer mb={10} type="small">
          {APP_CONTENT.realEstateAssetDetail.editModal.currentPrice}:{' '}
          {formatCurrency(asset.currentPrice, asset.inputCurrency)}
        </TextContainer>
        <TextContainer mb={10} type="small">
          <TextContainer type="small">
            {ASSET_DETAIL_CONTENT.startDate}:{' '}
          </TextContainer>
          {parseToString(new Date(asset.inputDay), { withTime: false })}
        </TextContainer>
      </View>
    </View>
  );
});
