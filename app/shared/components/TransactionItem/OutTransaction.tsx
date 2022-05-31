import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { ITransactionItem } from 'shared/models';
import { styleProvider, colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';
import { Icon } from '../Icon';
import { TextContainer } from '../TextContainer';

const MARGIN = 10;

interface IProps {
  info: ITransactionItem;
  outContent: string;
  haveTaxAndFee?: boolean;
  toFromContent: string;
}

export const OutTransaction = ({
  info,
  outContent,
  toFromContent,
  haveTaxAndFee = true,
}: IProps) => {
  return (
    <View>
      <TextContainer mb={MARGIN}>
        {parseToString(new Date(info.createdAt))}
      </TextContainer>
      <View style={styles.info}>
        <View style={styleProvider.centerHorizontal}>
          <Icon.Entypo
            name="arrow-long-left"
            color={colorScheme.red500}
            size={20}
          />
          <TextContainer ml={MARGIN} semiBold type="small">
            {outContent}
          </TextContainer>
          <TextContainer ml={10} color={colorScheme.red500}>
            -{formatCurrency(info.amount, info.currencyCode)}
          </TextContainer>
        </View>

        <>
          {haveTaxAndFee && (
            <TextContainer type="small">
              {APP_CONTENT.fee}: {info.fee} {APP_CONTENT.tax}: {info.tax}
            </TextContainer>
          )}
        </>
      </View>

      <TextContainer mt={10} type="small">
        {toFromContent}
      </TextContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
