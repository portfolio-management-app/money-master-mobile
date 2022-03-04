import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { SCREEN_CONTENT } from 'screens/market-cap/constant';
import { NoData } from 'shared/components';
import { CoinItem, Filter } from './components';
import { CryptoStore } from './store';

const Component = () => {
  React.useEffect(() => {
    CryptoStore.getData();
  }, []);

  return (
    <>
      <Filter />
      {CryptoStore.data.length ? (
        <FlatList
          refreshing={CryptoStore.isLoading}
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                CryptoStore.resetPage();
                CryptoStore.getData();
              }}
              refreshing={CryptoStore.isLoading}
            />
          }
          data={CryptoStore.data}
          renderItem={(item) => <CoinItem coin={item} />}
          keyExtractor={(item) => item.id}
          onEndReached={() => CryptoStore.getData()}
        />
      ) : (
        <>
          {!CryptoStore.isLoading && <NoData message={SCREEN_CONTENT.noData} />}
        </>
      )}
    </>
  );
};
export const CryptoMarket = observer(Component);