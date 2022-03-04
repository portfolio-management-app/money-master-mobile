import React from 'react';
import { ListRenderItemInfo, StyleSheet } from 'react-native';
import { Image, TouchableOpacity, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { ICrypto } from '../store';
import { CoinPrice } from './CoinPrice';

interface IProps {
  coin: ListRenderItemInfo<ICrypto>;
}

const Component = ({ coin }: IProps) => {
  const { image, name, priceChange, pricePercent, currentPrice, lastUpdate } =
    coin.item;
  return (
    <TouchableOpacity style={styles.coinButton}>
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
          {parseToString(new Date(lastUpdate), true)}
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
