import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import { AssetSectionHeader } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { DetailModal, TransactionDetail } from './components';
import { fakeData } from '../../fake-data';

export const TransactionList = () => {
  const [open, setOpen] = React.useState(true);

  const [openModal, setOpenModal] = React.useState(false);

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
        {fakeData.transactions.map((item) => (
          <TransactionDetail
            onPress={() => setOpenModal(true)}
            key={item.id}
            amount={item.amount}
            type={item.type as any}
            receiver={item.receiver}
            date={item.date}
          />
        ))}
      </ExpandableSection>
    </>
  );
};
