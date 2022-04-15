import React from 'react';
import { View } from 'react-native';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, TextContainer } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICustomAsset } from 'shared/models';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

interface IProps {
  info: ICustomAsset;
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
      <View style={styleProvider.centerVertical}>
        <View>
          <TextContainer mb={10} color={colorScheme.theme} bold type="h1">
            {formatCurrency(info.inputMoneyAmount, info.inputCurrency)}
          </TextContainer>
          <TextContainer mb={10} type="small">
            {ASSET_DETAIL_CONTENT.name}: {info.name}
          </TextContainer>
          <TextContainer mb={10} type="small">
            {ASSET_DETAIL_CONTENT.description}:{' '}
            {info.description === ''
              ? ASSET_DETAIL_CONTENT.none
              : info.description}
          </TextContainer>
        </View>
      </View>
    </ExpandableSection>
  );
};
