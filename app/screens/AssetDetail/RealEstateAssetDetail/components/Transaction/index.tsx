import { observer } from 'mobx-react-lite';
import React from 'react';

import {
  TransactionDetailModal,
  TransactionHeader,
  TransactionList,
} from 'shared/components';
import { ITransactionItem } from 'shared/models';
import { RealEstateAssetStore } from 'shared/stores';

export const Transaction = observer(() => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<
    ITransactionItem | undefined
  >(undefined);

  const { transactionList, getTransactionList, loading } = RealEstateAssetStore;

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
