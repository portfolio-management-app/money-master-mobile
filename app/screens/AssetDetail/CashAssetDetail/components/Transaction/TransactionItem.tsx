import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-ui-lib';
import { InTransaction, OutTransaction } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { ICashAsset, ITransactionItem } from 'shared/models';
import { colorScheme } from 'shared/styles';

interface IProps {
  info: ITransactionItem;
  onPress?: () => void;
  currentAsset: ICashAsset;
}

export const TransactionItem = ({ info, onPress, currentAsset }: IProps) => {
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
          {info.referentialAssetId === currentAsset.id ? (
            <OutTransaction
              info={info}
              outContent={APP_CONTENT.transactionDetail.out}
              toFromContent={`${APP_CONTENT.transactionDetail.to}: ${info.destinationAssetName}`}
            />
          ) : (
            <InTransaction
              info={info}
              inContent={APP_CONTENT.buy}
              toFromContent={`${APP_CONTENT.transactionDetail.from}: ${info.referentialAssetName}`}
            />
          )}
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
          {info.destinationAssetId !== currentAsset.id ? (
            <OutTransaction
              info={info}
              outContent={APP_CONTENT.sell}
              toFromContent={''}
            />
          ) : (
            <InTransaction
              info={info}
              inContent={APP_CONTENT.transactionDetail.in}
              toFromContent={`${APP_CONTENT.transactionDetail.from}: ${info.referentialAssetName}`}
            />
          )}
        </TouchableOpacity>
      );
    case 'moveToFund':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <OutTransaction
            info={info}
            haveTaxAndFee={false}
            outContent={APP_CONTENT.draw}
            toFromContent={`${APP_CONTENT.transactionDetail.to}: ${APP_CONTENT.transactionDetail.fund}`}
          />
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
