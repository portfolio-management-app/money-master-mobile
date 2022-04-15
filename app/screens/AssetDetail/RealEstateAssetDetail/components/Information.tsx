import React from 'react';
import { View } from 'react-native';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, TextContainer } from 'shared/components';
import { APP_CONTENT, ASSET_DETAIL_CONTENT } from 'shared/constants';
import { IRealEstateAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

interface IProps {
  info: IRealEstateAsset;
}
const SCREEN_CONTENT = APP_CONTENT.realEstateAssetDetail;

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
      <View style={styleProvider.centerVertical}>
        <TextContainer mb={10} color={colorScheme.theme} bold type="h1">
          {formatCurrency(info.inputMoneyAmount, info.inputCurrency)}
        </TextContainer>
        <View>
          <TextContainer mb={10} type="small">
            {ASSET_DETAIL_CONTENT.realEstateName}: {info.name}
          </TextContainer>
          <TextContainer mb={10} type="small">
            {ASSET_DETAIL_CONTENT.description}:{' '}
            {info.description === ''
              ? ASSET_DETAIL_CONTENT.none
              : info.description}
          </TextContainer>
          <TextContainer mb={10} type="small">
            {SCREEN_CONTENT.editModal.currentPrice}:{' '}
            {formatCurrency(info.currentPrice, info.inputCurrency)}
          </TextContainer>
          <TextContainer mb={10} type="small">
            <TextContainer type="small">
              {ASSET_DETAIL_CONTENT.startDate}:{' '}
            </TextContainer>
            {parseToString(new Date(info.inputDay), { withTime: false })}
          </TextContainer>
        </View>
      </View>
    </ExpandableSection>
  );
};
