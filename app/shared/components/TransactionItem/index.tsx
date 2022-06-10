import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { colorScheme } from 'shared/styles';
import { InTransaction } from './InTransaction';
import { OutTransaction } from './OutTransaction';

interface IProps {
  info: ITransactionItem;
  onPress?: () => void;
}

export const TransactionDetail = ({ info, onPress }: IProps) => {
  switch (info.singleAssetTransactionType) {
    case 'buyFromOutside':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <InTransaction info={info} inContent={APP_CONTENT.buy} />
        </TouchableOpacity>
      );
    case 'buyFromCash':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <InTransaction
            info={info}
            inContent={APP_CONTENT.buy}
            toFromContent={`${APP_CONTENT.transactionDetail.from}: ${info.referentialAssetName}`}
          />
        </TouchableOpacity>
      );
    case 'buyFromFund':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <InTransaction
            info={info}
            inContent={APP_CONTENT.buy}
            toFromContent={`${APP_CONTENT.transactionDetail.from}: ${APP_CONTENT.transactionDetail.fund}`}
          />
        </TouchableOpacity>
      );
    case 'withdrawToCash':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <OutTransaction
            info={info}
            outContent={APP_CONTENT.sell}
            toFromContent={`${APP_CONTENT.transactionDetail.to}: ${info.destinationAssetName}`}
          />
        </TouchableOpacity>
      );
    case 'moveToFund':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <OutTransaction
            info={info}
            outContent={APP_CONTENT.transactionDetail.transfer}
            haveTaxAndFee={false}
            toFromContent={`${APP_CONTENT.transactionDetail.to}: ${APP_CONTENT.transactionDetail.fund}`}
          />
        </TouchableOpacity>
      );
    case 'withdrawToOutside':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <OutTransaction
            info={info}
            outContent={APP_CONTENT.draw}
            haveTaxAndFee={false}
          />
        </TouchableOpacity>
      );
    case 'addValue':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <InTransaction info={info} inContent={APP_CONTENT.buy} />
        </TouchableOpacity>
      );
    default:
      return <></>;
  }
};

const styles = StyleSheet.create({
  transactionItem: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: colorScheme.gray400,
  },
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
