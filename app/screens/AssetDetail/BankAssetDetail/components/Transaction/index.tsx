import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  TransactionDetailModal,
  TransactionHeader,
  TransactionList,
} from 'shared/components';
import { ITransactionItem } from 'shared/models';
import { BankAssetStore } from 'shared/stores';

export const Transaction = observer(() => {
  const [open, setOpen] = React.useState(true);
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<
    ITransactionItem | undefined
  >(undefined);

  const { transactionList, loading, getTransactionList } = BankAssetStore;

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
      <TransactionHeader />
      <TransactionList
        data={transactionList}
        onRefresh={() => getTransactionList()}
        refreshing={loading}
        onItemPress={handleTransactionPress}
      />
    </>
  );
});