import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, TextContainer } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { IStockAsset } from 'shared/models';
import { colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

interface IProps {
  info: IStockAsset;
}

export const Information = ({ info }: IProps) => {
  const [open, setOpen] = React.useState(true);

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
      <TextContainer mb={10} type="small" semiBold>
        {ASSET_DETAIL_CONTENT.currentPrice}:{' '}
        <TextContainer type="small" color={colorScheme.blue200}>
          {formatCurrency(info.currentPrice, info.currencyCode)}
        </TextContainer>
      </TextContainer>
      <TextContainer semiBold mb={10} type="small">
        {ASSET_DETAIL_CONTENT.buyPrice}:{' '}
        <TextContainer type="small" color={colorScheme.green300}>
          {formatCurrency(info.purchasePrice, info.currencyCode)}
        </TextContainer>
      </TextContainer>
      <TextContainer semiBold mb={10} type="small">
        {ASSET_DETAIL_CONTENT.name}:{' '}
        <TextContainer type="small">{info.name}</TextContainer>
      </TextContainer>
      <TextContainer semiBold mb={10} type="small">
        {ASSET_DETAIL_CONTENT.stockCode}:{' '}
        <TextContainer type="small"> {info.stockCode}</TextContainer>
      </TextContainer>
      <TextContainer semiBold mb={10} type="small">
        {ASSET_DETAIL_CONTENT.description}:{' '}
        <TextContainer type="small">
          {' '}
          {info.description === ''
            ? ASSET_DETAIL_CONTENT.none
            : info.description}
        </TextContainer>
      </TextContainer>

      <TextContainer semiBold mb={10} type="small">
        {ASSET_DETAIL_CONTENT.amountHolding}:{' '}
        <TextContainer type="small">{info.currentAmountHolding}</TextContainer>
      </TextContainer>
      <TextContainer mb={10} type="small">
        <TextContainer semiBold type="small">
          {ASSET_DETAIL_CONTENT.buyDate}:{' '}
        </TextContainer>
        {parseToString(new Date(info.inputDay), { withTime: false })}
      </TextContainer>
    </ExpandableSection>
  );
};
