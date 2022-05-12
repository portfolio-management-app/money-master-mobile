import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';
import {
  Empty,
  PlatformView,
  SellOptions,
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
  const [showSellOption, setShowSellOption] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState<IStockAsset | null>(
    null
  );
  const navigation = useNavigation<MainStackNavigationProp>();
  const { symbol } = StockDetailStore;
  const { getStockBySymbol, getStockAsset, doneLoadingStockAsset } =
    PortfolioDetailStore;
  const filteredStock = getStockBySymbol(symbol);

  React.useEffect(() => {
    getStockAsset();
  }, [getStockAsset]);

  const handleSellToCash = () => {
    if (selectedAsset)
      navigation.navigate('CashAssetPicker', {
        type: 'CASH',
        sourceId: selectedAsset.id,
      });
  };

  const handleSellToFund = () => {
    if (selectedAsset)
      navigation.navigate('StockTransfer', { info: selectedAsset });
  };

  const handleAssetPress = (asset: IStockAsset) => {
    setSelectedAsset(asset);
    setShowSellOption(!showSellOption);
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
                onPress={() => handleAssetPress(stock)}
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

      <SellOptions
        onSellToCash={handleSellToCash}
        onSellToInvestFund={handleSellToFund}
        onClose={() => setShowSellOption(!showSellOption)}
        show={showSellOption}
      />
    </PlatformView>
  );
});
