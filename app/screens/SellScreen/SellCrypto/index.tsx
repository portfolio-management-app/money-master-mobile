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
import { CoinDetailStore, PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.sellScreen;

export const SellCrypto = observer(() => {
  const { coinInfo } = CoinDetailStore;
  const { getCoinByCode, getCryptoAsset, doneLoadingCryptoAsset } =
    PortfolioDetailStore;
  const filteredCoin = getCoinByCode(coinInfo.id);

  React.useEffect(() => {
    getCryptoAsset();
  }, [getCryptoAsset]);
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.title} />
      {filteredCoin.length === 0 && doneLoadingCryptoAsset && (
        <View
          style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}
        >
          <Empty message={CONTENT.noAsset} />
        </View>
      )}
      {filteredCoin.map((coin) => (
        <TouchableOpacity style={styleProvider.card} key={coin.id}>
          <TextContainer>{coin.name}</TextContainer>
        </TouchableOpacity>
      ))}
      <TransparentLoading show={!doneLoadingCryptoAsset} />
    </PlatformView>
  );
});
