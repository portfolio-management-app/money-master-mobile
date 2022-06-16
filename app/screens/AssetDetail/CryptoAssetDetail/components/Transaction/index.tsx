import React from 'react';
import {
  AssetTransactionFilter,
  TransactionDetailModal,
  TransactionList,
} from 'shared/components';
import { ITransactionItem } from 'shared/models';
import { observer } from 'mobx-react-lite';
import { CryptoAssetStore } from 'shared/stores';

export const Transaction = observer(() => {
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
      <AssetTransactionFilter />
      <TransactionList
        onRefresh={() => getTransactionList()}
        data={transactionList}
        refreshing={loading}
        onItemPress={handleItemPress}
      />
    </>
  );
});
