import { observer } from 'mobx-react-lite';
import React from 'react';
import { TransactionDetailModal, TransactionList } from 'shared/components';
import { ITransactionItem } from 'shared/models';
import { BankAssetStore } from 'shared/stores';

export const Transaction = observer(() => {
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
      <TransactionList
        data={transactionList}
        onRefresh={() => getTransactionList()}
        refreshing={loading}
        onItemPress={handleTransactionPress}
      />
    </>
  );
});
