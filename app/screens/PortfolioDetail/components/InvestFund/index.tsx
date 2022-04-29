import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { InvestFundStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';
export const InvestFund = observer(() => {
  const { getFund, information } = InvestFundStore;
  React.useEffect(() => {
    getFund();
  }, [getFund]);
  return (
    <View style={[styleProvider.centerVertical, { marginTop: 20 }]}>
      <TextContainer type="h1" bold color={colorScheme.theme}>
        {formatCurrency(information.currentAmount, information.initialCurrency)}
      </TextContainer>
    </View>
  );
});
