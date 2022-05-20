import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { APP_CONTENT, TRANSACTION_DETAIL_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { PortfolioDetailStore } from 'shared/stores';
import { styleProvider, colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

interface IProps {
  info: ITransactionItem;
  onPress?: () => void;
}

const MARGIN = 10;

export const TransactionDetail = observer(({ info, onPress }: IProps) => {
  const { getCurrencyById } = PortfolioDetailStore;
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
                {APP_CONTENT.buy}
              </TextContainer>
            </View>
            <TextContainer color={colorScheme.green300}>
              +{formatCurrency(info.amount, info.currencyCode)}
            </TextContainer>
          </View>
        </TouchableOpacity>
      );
    case 'withdrawValue':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <TextContainer mb={MARGIN}>
            {parseToString(new Date(info.createdAt))}
          </TextContainer>
          <View style={styles.info}>
            <View>
              <View style={styleProvider.centerHorizontal}>
                <Icon.Entypo
                  name="arrow-long-left"
                  color={colorScheme.red500}
                  size={20}
                />
                <TextContainer ml={MARGIN} semiBold type="small">
                  {APP_CONTENT.draw}
                </TextContainer>
              </View>
              <TextContainer mt={10} type="small">
                {APP_CONTENT.transactionDetail.to}:{' '}
                {getCurrencyById(info.destinationAssetId || 0)?.name}
              </TextContainer>
            </View>
            <TextContainer color={colorScheme.red500}>
              -{formatCurrency(info.amount, info.currencyCode)}
            </TextContainer>
          </View>
        </TouchableOpacity>
      );
    case 'moveToFund':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
          <TextContainer mb={MARGIN}>
            {parseToString(new Date(info.createdAt))}
          </TextContainer>
          <View style={styles.info}>
            <View>
              <View style={styleProvider.centerHorizontal}>
                <Icon.Entypo
                  name="arrow-long-left"
                  color={colorScheme.red500}
                  size={20}
                />
                <TextContainer ml={MARGIN} semiBold type="small">
                  {APP_CONTENT.draw}
                </TextContainer>
              </View>
              <TextContainer mt={10} type="small">
                {APP_CONTENT.transactionDetail.to}:{' '}
                {TRANSACTION_DETAIL_CONTENT.fund}
              </TextContainer>
            </View>
            <TextContainer color={colorScheme.red500}>
              -{formatCurrency(info.amount, info.currencyCode)}
            </TextContainer>
          </View>
        </TouchableOpacity>
      );

    default:
      return <></>;
  }
});

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
