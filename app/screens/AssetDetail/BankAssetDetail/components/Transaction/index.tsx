import { observer } from 'mobx-react-lite';
import React from 'react';
import { ExpandableSection } from 'react-native-ui-lib';
import {
  AssetSectionHeader,
  TransactionDetailModal,
  TransactionList,
} from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { BankAssetDetailStore } from '../../store';

export const Transaction = observer(() => {
  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<
    ITransactionItem | undefined
  >(undefined);

  const { transactionList, loading, getTransactionList } = BankAssetDetailStore;

  const handleTransactionPress = (transaction: ITransactionItem) => {
    setSelectedTransaction(transaction);
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
      >
        <TransactionList
          data={transactionList}
          onRefresh={() => getTransactionList()}
          refreshing={loading}
          onItemPress={handleTransactionPress}
        />
      </ExpandableSection>
    </>
  );
});
