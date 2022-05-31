import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { Empty, Skeleton, SkeletonLoadable } from 'shared/components';
import { InvestFundStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { TransactionItem } from './TransactionItem';

export const TransactionList = observer(() => {
  const { transactionList, loading, getAllInformation } = InvestFundStore;
  return (
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
          renderItem={(data) => <TransactionItem item={data.item} />}
        />
      }
    />
  );
});
