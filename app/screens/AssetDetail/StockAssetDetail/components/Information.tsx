import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, StockInformationCard } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { IStockAsset } from 'shared/models';

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
      <StockInformationCard asset={info} />
    </ExpandableSection>
  );
};
