import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, TextContainer } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { formatCurrency } from 'utils/number';
import { fakeData } from '../fake-data';

export const Information = () => {
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
      <TextContainer mb={10} color={colorScheme.theme} bold type="h1">
        {formatCurrency(fakeData.value, 'USD')}
      </TextContainer>
      <TextContainer mb={10} type="small">
        {fakeData.currency}
      </TextContainer>
      <TextContainer mb={10} type="small">
        {fakeData.name}
      </TextContainer>
      <TextContainer mb={10} type="small">
        {fakeData.description}
      </TextContainer>
    </ExpandableSection>
  );
};
