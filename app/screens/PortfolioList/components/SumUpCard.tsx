import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';

export const SumUpCard = () => {
  return (
    <View style={styles.container}>
      <TextContainer light>Total: 2 portfolios</TextContainer>
      <TextContainer bold light type="h1">
        $10324.221
      </TextContainer>
      <TextContainer light type="small">
        Open P/L:{' '}
        <TextContainer color={colorScheme.warning}>-$32.23</TextContainer>
      </TextContainer>
      <TextContainer light type="small">
        Daily P/L:{' '}
        <TextContainer color={colorScheme.green200}>-$32.23</TextContainer>
      </TextContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.theme,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
