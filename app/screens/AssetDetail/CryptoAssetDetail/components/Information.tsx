import React from 'react';
import { View } from 'react-native';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, TextContainer } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICryptoAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { calcPercent, formatCurrency } from 'utils/number';

interface IProps {
  info: ICryptoAsset;
}

export const Information = ({ info }: IProps) => {
  const [open, setOpen] = React.useState(true);
  const percent = calcPercent(info.currentPrice, info.purchasePrice);
  return (
    <ExpandableSection
      expanded={open}
      onPress={() => setOpen(!open)}
      sectionHeader={
        <AssetSectionHeader
          open={open}
          title={ASSET_DETAIL_CONTENT.information}
        />
      }
    >
      <View style={styleProvider.centerVertical}>
        <View>
          <TextContainer bold type="h1" color={colorScheme.theme}>
            {formatCurrency(info.currentPrice, info.currencyCode)}
          </TextContainer>
          <View style={[styleProvider.centerHorizontal, { marginTop: 10 }]}>
            <TextContainer type="small">
              {ASSET_DETAIL_CONTENT.buyPrice}:{' '}
            </TextContainer>
            <TextContainer type="small" color={colorScheme.green300}>
              {formatCurrency(info.purchasePrice, info.currencyCode)}
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
            <TextContainer type="small">{info.description}</TextContainer>
          </View>
          <View style={[styleProvider.centerHorizontal, { marginTop: 10 }]}>
            <TextContainer type="small">
              {ASSET_DETAIL_CONTENT.amountHolding}:{' '}
            </TextContainer>
            <TextContainer type="small">
              {info.currentAmountHolding}
            </TextContainer>
          </View>
        </View>
      </View>
    </ExpandableSection>
  );
};
