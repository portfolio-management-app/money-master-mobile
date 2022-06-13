import React from 'react';
import { View } from 'react-native-ui-lib';
import { InTransaction, OutTransaction } from 'shared/components';
import { TRANSACTION_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { styleProvider } from 'shared/styles';

interface IProps {
  info: ITransactionItem;
}

export const TransactionItem = ({ info }: IProps) => {
  switch (info.destinationAssetName) {
    case 'fund':
      return (
        <View style={styleProvider.transactionItem}>
          <InTransaction
            info={info}
            inContent={`${TRANSACTION_DETAIL_CONTENT.in}`}
            haveTaxAndFee={false}
            toFromContent={`${TRANSACTION_DETAIL_CONTENT.from} ${info.referentialAssetName}`}
          />
        </View>
      );
    default:
      return (
        <View style={styleProvider.transactionItem}>
          <OutTransaction
            info={info}
            outContent={`${TRANSACTION_DETAIL_CONTENT.out}`}
            haveTaxAndFee={false}
            toFromContent={`${TRANSACTION_DETAIL_CONTENT.to} ${info.destinationAssetName}`}
          />
        </View>
      );
  }
};
