import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  AssetTransactionFilter,
  TransactionDetailModal,
} from 'shared/components';
import { ITransactionFilterType, ITransactionItem } from 'shared/models';
import { CashAssetStore } from 'shared/stores';
import { TransactionList } from './TransactionList';

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
    information,
  } = CashAssetStore;

  React.useEffect(() => {
    transactionQuery.reset();
    getTransactionList();
  }, [getTransactionList, transactionQuery]);

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
        currentAsset={information}
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
