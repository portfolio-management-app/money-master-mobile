import React from 'react';
import { TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { formatCurrency } from 'utils/number';

export const NotiPriceInfo = ({
  amount,
  currency,
}: {
  amount: number;
  currency: string;
}) => {
  return (
    <TextContainer color={colorScheme.green400}>
      {formatCurrency(amount, currency)}
    </TextContainer>
  );
};
