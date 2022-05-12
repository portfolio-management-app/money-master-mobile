import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import {
  AssetSectionHeader,
  CustomAssetInformationCard,
} from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICustomAsset } from 'shared/models';

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
      <CustomAssetInformationCard asset={info} />
    </ExpandableSection>
  );
};
