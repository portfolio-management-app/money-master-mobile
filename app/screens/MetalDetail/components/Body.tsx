import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { MetalStore } from 'shared/stores';
import { colorScheme } from 'shared/styles';
import { MetalDetailScreenProps } from 'shared/types';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.metalDetailScreen;

export const Body = observer(({ type }: { type: MetalDetailScreenProps }) => {
  const { information } = MetalStore;
  const renderItem = information.items[0];
  switch (type) {
    case 'gold':
      return (
        <View style={styles.container}>
          <TextContainer bold color={colorScheme.blue200} type="h1">
            {formatCurrency(renderItem.xauPrice, renderItem.curr)}
          </TextContainer>
          <TextContainer mt={10}>
            {CONTENT.close}:{' '}
            <TextContainer color={colorScheme.green300}>
              {formatCurrency(renderItem.xauClose, renderItem.curr)}
            </TextContainer>
          </TextContainer>
          <TextContainer mt={10}>
            {CONTENT.change}:{' '}
            <TextContainer
              color={
                renderItem.chgXau > 0
                  ? colorScheme.green400
                  : colorScheme.red500
              }
            >
              {renderItem.chgXau > 0 && '+'}
              {renderItem.chgXau}%
            </TextContainer>
          </TextContainer>
        </View>
      );
    case 'silver':
      return (
        <View style={styles.container}>
          <TextContainer bold color={colorScheme.blue200} type="h1">
            {formatCurrency(
              information.items[0].xagPrice,
              information.items[0].curr
            )}
          </TextContainer>
          <TextContainer mt={10}>
            {CONTENT.close}:{' '}
            <TextContainer color={colorScheme.green300}>
              {formatCurrency(renderItem.xagClose, renderItem.curr)}
            </TextContainer>
          </TextContainer>
          <TextContainer mt={10}>
            {CONTENT.change}:{' '}
            <TextContainer
              color={
                renderItem.chgXag > 0
                  ? colorScheme.green400
                  : colorScheme.red500
              }
            >
              {renderItem.chgXag > 0 && '+'}
              {renderItem.chgXag}%
            </TextContainer>
          </TextContainer>
        </View>
      );
  }
});

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
