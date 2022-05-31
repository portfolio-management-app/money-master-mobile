import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { InvestFundStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { formatCurrency } from 'utils/number';
import { TransactionList } from './components';
export const InvestFund = observer(() => {
  const { getFund, information } = InvestFundStore;
  React.useEffect(() => {
    getFund();
  }, [getFund]);
  return (
    <>
      <View style={[styleProvider.centerVertical, { marginTop: 20 }]}>
        <TextContainer type="h1" bold color={colorScheme.theme}>
          {formatCurrency(
            information.currentAmount,
            information.initialCurrency
          )}
        </TextContainer>
      </View>
      <TextContainer ml={20} mt={20} mb={20} bold>
        {ASSET_DETAIL_CONTENT.transaction}
      </TextContainer>

      <TransactionList />
    </>
  );
});
