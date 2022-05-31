import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { ICurrencyAsset, ITransactionItem } from 'shared/models';
import { TransactionItem } from './TransactionItem';

interface IProps {
  data: Array<ITransactionItem>;
  onRefresh?: () => void;
  refreshing: boolean;
  onItemPress?: (item: ITransactionItem) => void;
  currentAsset: ICurrencyAsset;
}

const Component = ({
  data,
  onRefresh,
  refreshing,
  onItemPress,
  currentAsset,
}: IProps) => {
  return (
    <FlatList
      style={{ marginBottom: 50 }}
      data={data}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      keyExtractor={(e) => e.id.toString()}
      renderItem={(e) => (
        <TransactionItem
          currentAsset={currentAsset}
          onPress={() => onItemPress && onItemPress(e.item)}
          info={e.item}
        />
      )}
    />
  );
};

export const TransactionList = React.memo(Component);
