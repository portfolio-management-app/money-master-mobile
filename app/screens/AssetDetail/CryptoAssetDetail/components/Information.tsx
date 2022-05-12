import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, CryptoInformationCard } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICryptoAsset } from 'shared/models';

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
      <CryptoInformationCard asset={info} />
    </ExpandableSection>
  );
};
