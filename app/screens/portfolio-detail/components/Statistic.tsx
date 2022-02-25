import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';

export const Statistic = () => {
  return (
    <View style={styles.container}>
      <TextContainer light bold type="h1">
        $76 542.45
      </TextContainer>
      <TextContainer light>
        Open D/L:{' '}
        <TextContainer color={colorScheme.warning}>-7.24%</TextContainer>
      </TextContainer>
      <TextContainer light>
        Daily P/L:{' '}
        <TextContainer color={colorScheme.green200}>+4.24%</TextContainer>
      </TextContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.theme,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 110,
    paddingVertical: 10,
  },
});
