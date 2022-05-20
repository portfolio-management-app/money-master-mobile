import { observer } from 'mobx-react-lite';
import React from 'react';
import { TransactionDetailModal, TransactionList } from 'shared/components';
import { ITransactionItem } from 'shared/models';
import { CashAssetStore } from 'shared/stores';

export const Transaction = observer(() => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<
    ITransactionItem | undefined
  >(undefined);

  const { transactionList, getTransactionList, loading } = CashAssetStore;

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
        refreshing={loading}
        data={transactionList}
        onItemPress={handleTransactionPress}
        onRefresh={() => getTransactionList()}
      />
    </>
  );
});
