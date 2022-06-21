import React from 'react';
import {
  AssetTransactionFilter,
  TransactionDetailModal,
  TransactionList,
} from 'shared/components';
import { ITransactionFilterType, ITransactionItem } from 'shared/models';
import { observer } from 'mobx-react-lite';
import { CryptoAssetStore } from 'shared/stores';

export const Transaction = observer(() => {
  const [openModal, setOpenModal] = React.useState(false);

  const [selectedTransaction, setSelectedTransaction] = React.useState<
    ITransactionItem | undefined
  >(undefined);

  const {
    transactionList,
    loading,
    getTransactionList,
    resetTransaction,
    transactionQuery,
  } = CryptoAssetStore;

  React.useEffect(() => {
    resetTransaction();
    transactionQuery.reset();
    getTransactionList();
  }, [getTransactionList, resetTransaction, transactionQuery]);

  const handleItemPress = (e: ITransactionItem) => {
    setSelectedTransaction(e);
    setOpenModal(!openModal);
  };

  const handleStartChange = (date: string) => {
    transactionQuery.setStartDate(date);
    transactionQuery.restPageNumber();
    resetTransaction();
    getTransactionList();
  };

  const handleEndChange = (date: string) => {
    transactionQuery.setEndDate(date);
    transactionQuery.restPageNumber();
    resetTransaction();
    getTransactionList();
  };

  const handleTypeChange = (type: ITransactionFilterType) => {
    transactionQuery.setType(type);
    transactionQuery.restPageNumber();
    resetTransaction();
    getTransactionList();
  };

  const handleReset = () => {
    transactionQuery.reset();
    resetTransaction();
    getTransactionList();
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
      <AssetTransactionFilter
        onTransactionTypeChange={handleTypeChange}
        onReset={handleReset}
        onFromDateChange={handleStartChange}
        onToDateChange={handleEndChange}
      />
      <TransactionList
        onRefresh={() => {
          transactionQuery.restPageNumber();
          resetTransaction();
          getTransactionList();
        }}
        data={transactionList}
        refreshing={loading}
        onItemPress={handleItemPress}
        onEndReached={() => {
          transactionQuery.increasePageNumber();
          getTransactionList();
        }}
      />
    </>
  );
});
