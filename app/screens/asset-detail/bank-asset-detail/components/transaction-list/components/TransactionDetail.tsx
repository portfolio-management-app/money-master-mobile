import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { styleProvider, colorScheme } from 'shared/styles';

interface IProps {
  type: 'buy' | 'transfer';
  amount: number;
  receiver: string | null;
  date: string;
  onPress?: () => void;
}

const MARGIN = 10;

export const TransactionDetail = ({
  type,
  amount,
  receiver,
  date,
  onPress,
}: IProps) => {
  switch (type) {
    case 'buy':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
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
        </TouchableOpacity>
      );
    case 'transfer':
      return (
        <TouchableOpacity onPress={onPress} style={styles.transactionItem}>
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
        </TouchableOpacity>
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
