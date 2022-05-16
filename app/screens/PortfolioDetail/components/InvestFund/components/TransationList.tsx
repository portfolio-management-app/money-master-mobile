import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { InvestFundStore } from 'shared/stores';
import { TransactionItem } from './TransactionItem';

export const TransactionList = observer(() => {
  const { transactionList, loading, getTransactionList } = InvestFundStore;
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={loading} onRefresh={getTransactionList} />
      }
      data={transactionList}
      keyExtractor={(item) => item.id.toString()}
      renderItem={(data) => <TransactionItem item={data.item} />}
    />
  );
});
