import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';
import {
  Empty,
  PlatformView,
  Skeleton,
  SkeletonLoadable,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IStockAsset } from 'shared/models';
import { PortfolioDetailStore, StockDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.sellScreen;

export const SellStock = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { symbol } = StockDetailStore;
  const { getStockBySymbol, getStockAsset, doneLoadingStockAsset } =
    PortfolioDetailStore;
  const filteredStock = getStockBySymbol(symbol);

  React.useEffect(() => {
    getStockAsset();
  }, [getStockAsset]);

  const handleSellToCash = (asset: IStockAsset) => {
    navigation.navigate('CashAssetPicker', {
      actionType: 'SELL',
      type: 'CASH',
      source: asset,
      transactionType: 'withdrawToCash',
      fromScreen: 'MARKET_CAP',
    });
  };

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.title} />
      <SkeletonLoadable
        loading={!doneLoadingStockAsset}
        skeleton={<Skeleton times={5} />}
        isDataEmpty={filteredStock.length === 0}
        dataComponent={
          <>
            {filteredStock.map((stock) => (
              <TouchableOpacity
                onPress={() => handleSellToCash(stock)}
                style={styleProvider.card}
                key={stock.id}
              >
                <TextContainer>{stock.name}</TextContainer>
              </TouchableOpacity>
            ))}
          </>
        }
        emptyComponent={<Empty message={CONTENT.noAsset} />}
      />
    </PlatformView>
  );
});
