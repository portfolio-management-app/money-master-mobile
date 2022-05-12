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
import { ICryptoAsset } from 'shared/models';
import {
  CoinDetailStore,
  CryptoAssetStore,
  PortfolioDetailStore,
} from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.sellScreen;

export const SellCrypto = observer(() => {
  const [showSellOption, setShowSellOption] = React.useState(false);
  const [selectedAsset, setSelectedAsset] = React.useState<ICryptoAsset | null>(
    null
  );
  const navigation = useNavigation<MainStackNavigationProp>();
  const { coinInfo } = CoinDetailStore;
  const { getCoinByCode, getCryptoAsset, doneLoadingCryptoAsset, information } =
    PortfolioDetailStore;
  const filteredCoin = getCoinByCode(coinInfo.id);

  React.useEffect(() => {
    getCryptoAsset();
    CryptoAssetStore.assignPortfolioId(information.id);
  }, [getCryptoAsset, information]);

  const handleSellToCash = () => {
    if (selectedAsset)
      navigation.navigate('CashAssetPicker', {
        type: 'CRYPTO',
        source: selectedAsset,
      });
  };

  const handleSellToFund = () => {
    if (selectedAsset)
      navigation.navigate('CryptoTransfer', { info: selectedAsset });
  };

  const handleAssetPress = (asset: ICryptoAsset) => {
    setSelectedAsset(asset);
    setShowSellOption(!showSellOption);
  };

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.title} />
      <SkeletonLoadable
        loading={!doneLoadingCryptoAsset}
        skeleton={<Skeleton times={5} />}
        isDataEmpty={filteredCoin.length === 0}
        dataComponent={
          <>
            {filteredCoin.map((coin) => (
              <TouchableOpacity
                onPress={() => handleAssetPress(coin)}
                style={styleProvider.card}
                key={coin.id}
              >
                <TextContainer>{coin.name}</TextContainer>
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
