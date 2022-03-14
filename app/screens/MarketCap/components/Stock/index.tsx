import { observer } from 'mobx-react-lite';
import React from 'react';
import { FlatList } from 'react-native';
import { TransparentLoading } from 'shared/components';
import { StockDetailStore } from 'shared/stores';
import { SearchModal, StockRenderItem } from './components';
import { StockStore } from './store';

export const StockMarket = observer(() => {
  const { stockList, loading } = StockStore;

  return (
    <>
      <FlatList
        data={stockList}
        renderItem={(item) => <StockRenderItem renderInfo={item} />}
      />
      <SearchModal />
      <TransparentLoading show={StockDetailStore.loading || loading} />
    </>
  );
});
