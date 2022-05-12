import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import {
  AssetSectionHeader,
  RealEstateInformationCard,
} from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { IRealEstateAsset } from 'shared/models';

interface IProps {
  info: IRealEstateAsset;
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
      <RealEstateInformationCard asset={info} />
    </ExpandableSection>
  );
};
