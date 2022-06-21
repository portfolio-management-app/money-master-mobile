import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, RefreshControl, View } from 'react-native';
import { SkeletonLoadable, Empty, Skeleton } from 'shared/components';
import { ICashAsset, ITransactionItem } from 'shared/models';
import { styleProvider } from 'shared/styles';
import { TransactionItem } from './TransactionItem';

interface IProps {
  data: Array<ITransactionItem>;
  onRefresh?: () => void;
  refreshing: boolean;
  onItemPress?: (item: ITransactionItem) => void;
  onEndReached?: () => void;
  currentAsset: ICashAsset;
}

export const TransactionList = observer(
  ({
    data,
    onRefresh,
    refreshing,
    onItemPress,
    onEndReached,
    currentAsset,
  }: IProps) => {
    return (
      <SkeletonLoadable
        dataComponent={
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
            onEndReached={({ distanceFromEnd }) => {
              if (distanceFromEnd > 0 && onEndReached) {
                onEndReached();
              }
            }}
          />
        }
        loading={refreshing}
        isDataEmpty={data.length === 0}
        skeleton={<Skeleton times={10} />}
        emptyComponent={
          <View style={styleProvider.flexCenter}>
            <Empty />
          </View>
        }
      />
    );
  }
);
