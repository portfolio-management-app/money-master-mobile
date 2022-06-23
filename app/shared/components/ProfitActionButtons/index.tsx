import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { BaseButton } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';

import { colorScheme } from 'shared/styles';

const CONTENT = APP_CONTENT.profit.actions;

interface IProps {
  onAddValue?: () => void;
  onSell?: () => void;
}

export const ProfitActionButtons = ({ onAddValue, onSell }: IProps) => {
  return (
    <View style={styles.container}>
      <BaseButton
        onPress={onAddValue}
        style={styles.buyBtn}
        enableShadow
        label={CONTENT.addValue}
      />
      <BaseButton
        onPress={onSell}
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
