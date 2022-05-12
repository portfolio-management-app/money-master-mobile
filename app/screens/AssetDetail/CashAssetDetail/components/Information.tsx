import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, CashInformationCard } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ICurrencyAsset } from 'shared/models';

interface IProps {
  info: ICurrencyAsset;
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
      <CashInformationCard asset={info} />
    </ExpandableSection>
  );
};
