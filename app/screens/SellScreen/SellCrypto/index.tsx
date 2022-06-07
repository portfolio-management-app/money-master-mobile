import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
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
import { ICryptoAsset } from 'shared/models';
import { CoinDetailStore, PortfolioDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.sellScreen;

export const SellCrypto = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { coinInfo } = CoinDetailStore;
  const { getCoinByCode, getCryptoAsset, doneLoadingCryptoAsset, information } =
    PortfolioDetailStore;
  const filteredCoin = getCoinByCode(coinInfo.id);

  React.useEffect(() => {
    getCryptoAsset();
  }, [getCryptoAsset, information]);

  const handleSellToCash = (asset: ICryptoAsset) => {
    navigation.navigate('CashAssetPicker', {
      actionType: 'SELL',
      type: 'crypto',
      source: asset,
      transactionType: 'withdrawToCash',
      fromScreen: 'MARKET_CAP',
    });
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
                onPress={() => handleSellToCash(coin)}
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
    </PlatformView>
  );
});
