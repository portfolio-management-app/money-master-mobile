import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { BaseButton } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioListStore } from 'shared/stores';
import { colorScheme } from 'shared/styles';

const CONTENT = APP_CONTENT.cryptoDetail;

export const ButtonGroup = () => {
  const navigation = useNavigation<MainStackNavigationProp>();

  const handleBuyPress = () => {
    PortfolioListStore.getPortfolioList();
    navigation.navigate('PortfolioPicker', {
      type: 'CASH',
      actionType: 'BUY',
    });
  };

  const handleOnSellPress = () => {
    navigation.navigate('PortfolioPicker', {
      type: 'CASH',
      actionType: 'SELL',
    });
  };
  return (
    <View style={styles.container}>
      <BaseButton
        onPress={handleBuyPress}
        style={styles.buyBtn}
        enableShadow
        label={CONTENT.buy}
      />
      <BaseButton
        onPress={handleOnSellPress}
        style={styles.sellBtn}
        enableShadow
        label={CONTENT.sell}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  buyBtn: {
    backgroundColor: colorScheme.green400,
    marginRight: 20,
    borderRadius: 10,
  },
  sellBtn: {
    backgroundColor: colorScheme.red500,
    borderRadius: 10,
  },
});
