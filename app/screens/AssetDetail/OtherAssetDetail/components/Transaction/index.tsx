import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  AssetTransactionFilter,
  TransactionDetailModal,
  TransactionList,
} from 'shared/components';
import { ITransactionFilterType, ITransactionItem } from 'shared/models';
import { CustomAssetStore } from 'shared/stores';

export const Transaction = observer(() => {
  const [openModal, setOpenModal] = React.useState(false);
  const [selectedTransaction, setSelectedTransaction] = React.useState<
    ITransactionItem | undefined
  >(undefined);

  const {
    transactionList,
    getTransactionList,
    loading,
    transactionQuery,
    getMoreTransaction,
  } = CustomAssetStore;

  React.useEffect(() => {
    getTransactionList();
  }, [getTransactionList]);

  const handleItemPress = (e: ITransactionItem) => {
    setSelectedTransaction(e);
    setOpenModal(!openModal);
  };

  const handleStartChange = (date: string) => {
    transactionQuery.setStartDate(date);
    transactionQuery.restPageNumber();

    getTransactionList();
  };

  const handleEndChange = (date: string) => {
    transactionQuery.setEndDate(date);
    transactionQuery.restPageNumber();

    getTransactionList();
  };

  const handleReset = () => {
    transactionQuery.reset();

    getTransactionList();
  };

  const handleTypeChange = (type: ITransactionFilterType) => {
    transactionQuery.setType(type);
    transactionQuery.restPageNumber();
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

          getTransactionList();
        }}
        data={transactionList}
        refreshing={loading}
        onItemPress={handleItemPress}
        onEndReached={() => {
          getMoreTransaction();
        }}
      />
    </>
  );
});
