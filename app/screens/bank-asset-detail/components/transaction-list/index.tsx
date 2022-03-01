import React from 'react';
import { StyleSheet } from 'react-native';
import { ExpandableSection, View } from 'react-native-ui-lib';
import { AssetSectionHeader, Icon, TextContainer } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { fakeData } from '../../fake-data';

const MARGIN = 10;

export const TransactionList = () => {
  const [open, setOpen] = React.useState(true);

  return (
    <>
      <ExpandableSection
        expanded={open}
        onPress={() => setOpen(!open)}
        sectionHeader={
          <AssetSectionHeader
            style={{
              padding: 20,
            }}
            open={open}
            title={ASSET_DETAIL_CONTENT.transaction}
          />
        }
      >
        {fakeData.transactions.map((item) => {
          return getRenderItem(
            item.type as any,
            item.id,
            item.amount,
            item.receiver,
            item.date
          );
        })}
      </ExpandableSection>
    </>
  );
};
const getRenderItem = (
  type: 'buy' | 'transfer',
  key: number,
  amount: number,
  receiver: string | null,
  date: string
): JSX.Element => {
  switch (type) {
    case 'buy':
      return (
        <View style={styles.transactionItem} key={key}>
          <TextContainer mb={MARGIN}>{date}</TextContainer>
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
              +{amount}
            </TextContainer>
          </View>
        </View>
      );
    case 'transfer':
      return (
        <View style={styles.transactionItem} key={key}>
          <TextContainer mb={MARGIN}>{date}</TextContainer>
          <View style={styles.info}>
            <View>
              <View style={styleProvider.centerHorizontal}>
                <Icon.Entypo
                  name="arrow-long-left"
                  color={colorScheme.red500}
                  size={20}
                />
                <TextContainer ml={MARGIN} semiBold type="small">
                  Transfer
                </TextContainer>
              </View>
              <TextContainer type="small" mt={MARGIN}>
                To: {receiver}
              </TextContainer>
            </View>
            <TextContainer color={colorScheme.red500}>-{amount}</TextContainer>
          </View>
        </View>
      );
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
