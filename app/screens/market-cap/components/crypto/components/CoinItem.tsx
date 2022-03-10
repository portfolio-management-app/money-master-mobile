import { useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { Image, TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { CoinDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { CryptoStore, ICrypto } from '../store';
import { CoinPrice } from './CoinPrice';

interface IProps {
  coin: ListRenderItemInfo<ICrypto>;
}

const Component = ({ coin }: IProps) => {
  const navigation = useNavigation();
  const {
    image,
    name,
    id,
    priceChange,
    pricePercent,
    currentPrice,
    lastUpdate,
  } = coin.item;

  const gotoDetail = React.useCallback(async () => {
    await CoinDetailStore.getChartData(id, CryptoStore.currency);
    navigation.navigate(
      screenName.coinDetail as never,
      { id: id, name: name, currency: CryptoStore.currency } as never
    );
  }, [id, name, navigation]);
  return (
    <TouchableOpacity onPress={gotoDetail} style={styles.coinButton}>
      <View>
        <View style={styleProvider.centerHorizontal}>
          <Image
            style={styleProvider.buttonIcon}
            source={{ uri: image }}
          ></Image>
          <TextContainer ml={10}>{name}</TextContainer>
        </View>
        <TextContainer mt={10} type="small">
          <TextContainer bold type="small">
            Last update:
          </TextContainer>{' '}
          {parseToString(new Date(lastUpdate))}
        </TextContainer>
      </View>
      <CoinPrice
        price={currentPrice}
        changeAmount={priceChange}
        percent={pricePercent}
      />
    </TouchableOpacity>
  );
};

export const CoinItem = React.memo(Component);

const styles = StyleSheet.create({
  coinButton: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomColor: colorScheme.gray400,
    borderBottomWidth: 0.5,
  },
});
