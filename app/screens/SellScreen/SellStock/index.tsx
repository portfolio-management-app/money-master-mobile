import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import {
  Empty,
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioDetailStore, StockDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.sellScreen;

export const SellStock = observer(() => {
  const { symbol } = StockDetailStore;
  const { getStockBySymbol, getStockAsset, doneLoadingStockAsset } =
    PortfolioDetailStore;
  const filteredStock = getStockBySymbol(symbol);

  React.useEffect(() => {
    getStockAsset();
  }, [getStockAsset]);
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.title} />
      {filteredStock.length === 0 && doneLoadingStockAsset && (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Empty message={CONTENT.noAsset} />
        </View>
      )}
      {filteredStock.map((stock) => (
        <TouchableOpacity style={styleProvider.card} key={stock.id}>
          <TextContainer>{stock.name}</TextContainer>
        </TouchableOpacity>
      ))}
      <TransparentLoading show={!doneLoadingStockAsset} />
    </PlatformView>
  );
});
