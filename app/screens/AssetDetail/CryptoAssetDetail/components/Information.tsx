import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, TextContainer } from 'shared/components';
import { APP_CONTENT, ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICryptoAsset } from 'shared/models';
import { colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

interface IProps {
  info: ICryptoAsset;
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
      <TextContainer mb={10} semiBold type="small">
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
        {ASSET_DETAIL_CONTENT.coinName}:{' '}
        <TextContainer type="small">{info.name}</TextContainer>
      </TextContainer>
      <TextContainer semiBold mb={10} type="small">
        {ASSET_DETAIL_CONTENT.coinCode}:{' '}
        <TextContainer type="small"> {info.cryptoCoinCode}</TextContainer>
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
