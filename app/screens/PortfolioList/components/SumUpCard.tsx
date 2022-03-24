import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { PortfolioListStore } from 'shared/stores';
import { colorScheme } from 'shared/styles';

export const SumUpCard = observer(() => {
  return (
    <View style={styles.container}>
      <TextContainer light>
        {APP_CONTENT.total}: {PortfolioListStore.portfolioList.length}{' '}
        {APP_CONTENT.portfolio}
      </TextContainer>
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
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.theme,
    padding: 20,
    borderRadius: 10,
    marginTop: 20,
  },
});
