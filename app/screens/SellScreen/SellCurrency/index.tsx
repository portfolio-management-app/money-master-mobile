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
import { ICurrencyAsset } from 'shared/models';
import { CurrencyDetailStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.sellScreen;

export const SellCurrency = observer(() => {
  const [showSellOption, setShowSellOption] = React.useState(false);
  const [selectedAsset, setSelectedAsset] =
    React.useState<ICurrencyAsset | null>(null);

  const navigation = useNavigation<MainStackNavigationProp>();
  const { currencyInformation } = CurrencyDetailStore;
  const { getCurrencyByCode, doneLoadingCurrencyAsset, getCurrencyAsset } =
    PortfolioDetailStore;
  const filteredCurrency = getCurrencyByCode(
    currencyInformation.s.split('/')[0]
  );

  React.useEffect(() => {
    getCurrencyAsset();
  }, [getCurrencyAsset]);

  const handleSellToCash = () => {
    if (selectedAsset)
      navigation.navigate('CashAssetPicker', {
        type: 'CASH',
        sourceId: selectedAsset.id,
      });
  };

  const handleSellToFund = () => {
    if (selectedAsset)
      navigation.navigate('CurrencyTransfer', { info: selectedAsset });
  };

  const handleAssetPress = (asset: ICurrencyAsset) => {
    setSelectedAsset(asset);
    setShowSellOption(!showSellOption);
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.title} />
      <SkeletonLoadable
        loading={!doneLoadingCurrencyAsset}
        skeleton={<Skeleton times={5} />}
        isDataEmpty={filteredCurrency.length === 0}
        dataComponent={
          <>
            {filteredCurrency.map((currency) => (
              <TouchableOpacity
                onPress={() => handleAssetPress(currency)}
                style={styleProvider.card}
                key={currency.id}
              >
                <TextContainer>{currency.name}</TextContainer>
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
