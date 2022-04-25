import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { ITransactionItem } from 'shared/models';
import { styleProvider, colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

interface IProps {
  info: ITransactionItem;
  onPress?: () => void;
}

const MARGIN = 10;

export const TransactionDetail = ({ info, onPress }: IProps) => {
  switch (info.singleAssetTransactionType) {
    case 'newAsset':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <TextContainer mb={MARGIN}>
            {parseToString(new Date(info.createdAt))}
          </TextContainer>
          <View style={styles.info}>
            <View style={styleProvider.centerHorizontal}>
              <Icon.Entypo
                name="arrow-long-right"
                color={colorScheme.green300}
                size={20}
              />
              <TextContainer ml={MARGIN} semiBold type="small">
                Buy
              </TextContainer>
            </View>
            <TextContainer color={colorScheme.green300}>
              +{formatCurrency(info.amount, info.currencyCode)}
            </TextContainer>
          </View>
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
