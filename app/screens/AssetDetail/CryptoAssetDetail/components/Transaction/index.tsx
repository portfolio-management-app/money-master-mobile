import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import {
  AssetSectionHeader,
  TransactionDetailModal,
  TransactionList,
} from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { observer } from 'mobx-react-lite';
import { CryptoAssetStore } from 'shared/stores';

export const Transaction = observer(() => {
  const [open, setOpen] = React.useState(true);

  const [openModal, setOpenModal] = React.useState(false);

  const [selectedTransaction, setSelectedTransaction] = React.useState<
    ITransactionItem | undefined
  >(undefined);

  const { transactionList, loading, getTransactionList } = CryptoAssetStore;

  const handleItemPress = (e: ITransactionItem) => {
    setSelectedTransaction(e);
    setOpenModal(!openModal);
  };

  return (
    <>
      <TransactionDetailModal
        onClose={() => {
          setOpenModal(false);
        }}
        info={selectedTransaction}
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
      ></ExpandableSection>
      <TransactionList
        onRefresh={() => getTransactionList()}
        data={transactionList}
        refreshing={loading}
        onItemPress={handleItemPress}
      />
    </>
  );
});
