import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { APP_CONTENT, ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICashAsset } from 'shared/models';
import { styleProvider, colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';
import { TextContainer } from '../TextContainer';

interface IProps {
  asset: ICashAsset;
  profit?: string;
}

export const CashInformationCard = observer(({ asset, profit }: IProps) => {
  return (
    <View style={styleProvider.centerVertical}>
      <View>
        <TextContainer mb={10} color={colorScheme.theme} bold type="h1">
          {formatCurrency(asset.amount, asset.currencyCode)}
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

        <TextContainer mb={10} type="small">
          <TextContainer type="small">
            {ASSET_DETAIL_CONTENT.startDate}:{' '}
          </TextContainer>
          {parseToString(new Date(asset.inputDay), { withTime: false })}
        </TextContainer>
        {profit && (
          <TextContainer mb={10} type="small">
            <TextContainer type="small">
              {APP_CONTENT.profit.currentProfit}:{' '}
            </TextContainer>
            <TextContainer type="small">{profit}</TextContainer>
          </TextContainer>
        )}
      </View>
    </View>
  );
});
