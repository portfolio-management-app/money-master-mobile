import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IInvestFundTransactionItem } from 'shared/models';
import { PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

interface IProps {
  item: IInvestFundTransactionItem;
}
const MARGIN = 10;

export const TransactionItem = ({ item }: IProps) => {
  return (
    <View style={styles.transactionItem}>
      <TextContainer mb={MARGIN}>
        {parseToString(new Date(item.createdAt))}
      </TextContainer>
      <View style={styles.info}>
        <View>
          <View style={styleProvider.centerHorizontal}>
            <Icon.Entypo
              name="arrow-long-right"
              color={colorScheme.green400}
              size={20}
            />
            <TextContainer ml={MARGIN} semiBold type="small">
              {APP_CONTENT.buy}
            </TextContainer>
          </View>
          <Source item={item} />
        </View>
        <TextContainer color={colorScheme.green400}>
          +{formatCurrency(item.amount, item.currencyCode)}
        </TextContainer>
      </View>
    </View>
  );
};

const Source = observer(({ item }: IProps) => {
  const { getCryptoById, getStockById, getBankById, getRealEstateById } =
    PortfolioDetailStore;
  switch (item.referentialAssetType) {
    case 'crypto':
      return (
        <TextContainer mt={10} type="small">
          {APP_CONTENT.transactionDetail.from}: {getCryptoById(item.id)?.name}
        </TextContainer>
      );
    case 'bankSaving':
      return (
        <TextContainer mt={10} type="small">
          {APP_CONTENT.transactionDetail.from}: {getBankById(item.id)?.name}
        </TextContainer>
      );
    case 'realEstate':
      return (
        <TextContainer mt={10} type="small">
          {APP_CONTENT.transactionDetail.from}:
          {getRealEstateById(item.id)?.name}
        </TextContainer>
      );
    case 'stock':
      return (
        <TextContainer mt={10} type="small">
          {APP_CONTENT.transactionDetail.from}: {getStockById(item.id)?.name}
        </TextContainer>
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
