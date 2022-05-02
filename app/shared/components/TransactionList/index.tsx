import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ITransactionItem } from 'shared/models';
import { TransactionDetail } from '../TransactionItem';

interface IProps {
  data: Array<ITransactionItem>;
  onRefresh?: () => void;
  refreshing: boolean;
  onItemPress?: (item: ITransactionItem) => void;
}

const Component = ({ data, onRefresh, refreshing, onItemPress }: IProps) => {
  return (
    <FlatList
      data={data}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyExtractor={(e) => e.id.toString()}
      renderItem={(e) => (
        <TransactionDetail
          onPress={() => onItemPress && onItemPress(e.item)}
          info={e.item}
        />
      )}
    />
  );
};

export const TransactionList = React.memo(Component);
