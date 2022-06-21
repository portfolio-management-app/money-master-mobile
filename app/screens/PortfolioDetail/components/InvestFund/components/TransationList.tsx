import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import {
  AssetTransactionFilter,
  Empty,
  Skeleton,
  SkeletonLoadable,
} from 'shared/components';
import { ITransactionFilterType } from 'shared/models';
import { InvestFundStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { TransactionItem } from './TransactionItem';

export const TransactionList = observer(() => {
  const {
    transactionList,
    loading,
    getAllInformation,
    resetTransaction,
    transactionQuery,
    getTransactionList,
  } = InvestFundStore;

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
      <AssetTransactionFilter
        onFromDateChange={handleStartChange}
        onToDateChange={handleEndChange}
        onReset={handleReset}
        onTransactionTypeChange={handleTypeChange}
      />
      <SkeletonLoadable
        skeleton={<Skeleton times={5} />}
        loading={loading}
        emptyComponent={
          <View style={styleProvider.flexCenter}>
            <Empty />
          </View>
        }
        isDataEmpty={transactionList.length === 0}
        dataComponent={
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={() => getAllInformation()}
              />
            }
            data={transactionList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(data) => <TransactionItem info={data.item} />}
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd > 0) {
                transactionQuery.increasePageNumber();
                getTransactionList();
              }
            }}
          />
        }
      />
    </>
  );
});
