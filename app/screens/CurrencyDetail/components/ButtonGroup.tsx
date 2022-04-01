import { useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { BaseButton } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioListStore } from 'shared/stores';
import { colorScheme } from 'shared/styles';
import { BuyScreenRouteProps } from 'shared/types';

const CONTENT = APP_CONTENT.cryptoDetail;

export const ButtonGroup = () => {
  const navigation = useNavigation();

  const handleBuyPress = () => {
    PortfolioListStore.getPortfolioList();
    navigation.navigate(
      screenName.buyCurrency as never,
      {
        type: 'CURRENCY',
      } as BuyScreenRouteProps as never
    );
  };
  return (
    <View style={styles.container}>
      <BaseButton
        onPress={handleBuyPress}
        style={styles.buyBtn}
        enableShadow
        label={CONTENT.buy}
      />
      <BaseButton style={styles.sellBtn} enableShadow label={CONTENT.sell} />
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
