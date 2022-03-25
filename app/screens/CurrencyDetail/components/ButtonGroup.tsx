import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { BaseButton } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';

const CONTENT = APP_CONTENT.cryptoDetail;

export const ButtonGroup = () => {
  return (
    <View style={styles.container}>
      <BaseButton style={styles.buyBtn} enableShadow label={CONTENT.buy} />
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
    backgroundColor: colorScheme.green300,
    marginRight: 20,
    borderRadius: 10,
  },
  sellBtn: {
    backgroundColor: colorScheme.red500,
    borderRadius: 10,
  },
});
