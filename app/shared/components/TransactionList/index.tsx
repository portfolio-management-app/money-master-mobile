import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { View } from 'react-native-ui-lib';
import { ITransactionItem } from 'shared/models';
import { styleProvider } from 'shared/styles';
import { Empty } from '../Empty';
import { Skeleton } from '../Skeleton';
import { SkeletonLoadable } from '../SkeletonLoadable';
import { TransactionDetail } from '../TransactionItem';

interface IProps {
  data: Array<ITransactionItem>;
  onRefresh?: () => void;
  refreshing: boolean;
  onItemPress?: (item: ITransactionItem) => void;
  onEndReached?: () => void;
}

export const TransactionList = observer(
  ({ data, onRefresh, refreshing, onItemPress, onEndReached }: IProps) => {
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
              <TransactionDetail
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
