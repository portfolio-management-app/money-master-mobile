import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { APP_CONTENT, ASSET_DETAIL_CONTENT } from 'shared/constants';
import { IStockAsset } from 'shared/models';
import { styleProvider, colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';
import { TextContainer } from '../TextContainer';

interface IProps {
  asset: IStockAsset;
  profit?: string;
}

export const StockInformationCard = observer(({ asset, profit }: IProps) => {
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
        <View style={[styleProvider.centerHorizontal, { marginTop: 10 }]}>
          <TextContainer type="small">
            {ASSET_DETAIL_CONTENT.buyDate}:{' '}
          </TextContainer>
          <TextContainer type="small">
            {parseToString(new Date(asset.inputDay), { withTime: false })}
          </TextContainer>
        </View>
        {profit && (
          <View style={[styleProvider.centerHorizontal, { marginTop: 10 }]}>
            <TextContainer type="small">
              {APP_CONTENT.profit.currentProfit}:{' '}
            </TextContainer>
            <TextContainer color={colorScheme.green400} type="small">
              {profit}
            </TextContainer>
          </View>
        )}
      </View>
    </View>
  );
});
