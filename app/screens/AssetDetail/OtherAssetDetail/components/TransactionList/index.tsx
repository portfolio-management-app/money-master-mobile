import { observer } from 'mobx-react-lite';
import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader, TransactionDetail } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { CustomAssetDetailStore } from '../../store';
import { DetailModal } from './components';

export const TransactionList = observer(() => {
  const [open, setOpen] = React.useState(true);

  const [openModal, setOpenModal] = React.useState(false);

  const { transactionList } = CustomAssetDetailStore;

  return (
    <>
      <DetailModal
        onClose={() => {
          setOpenModal(false);
        }}
        open={openModal}
      />
      <ExpandableSection
        expanded={open}
        onPress={() => setOpen(!open)}
        sectionHeader={
          <AssetSectionHeader
            style={{
              padding: 20,
            }}
            open={open}
            title={ASSET_DETAIL_CONTENT.transaction}
          />
        }
      >
        {transactionList.map((item) => (
          <TransactionDetail
            onPress={() => setOpenModal(true)}
            key={item.id}
            info={item}
          />
        ))}
      </ExpandableSection>
    </>
  );
});
