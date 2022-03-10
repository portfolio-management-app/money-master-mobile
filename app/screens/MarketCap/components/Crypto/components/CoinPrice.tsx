import React from 'react';
import { View } from 'react-native';
import { TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { formatCurrency } from 'utils/number';
import { CryptoStore } from '../store';

interface IProps {
  price: number;
  changeAmount: number;
  percent: number;
}
const Component = ({ price, changeAmount, percent }: IProps) => {
  return (
    <View>
      <TextContainer type="small" mb={10} mt={10} color={colorScheme.blue300}>
        <TextContainer type="small" bold>
          Price:{' '}
        </TextContainer>{' '}
        {formatCurrency(price, CryptoStore.currency)}
      </TextContainer>
      <View>
        {changeAmount >= 0 ? (
          <View>
            <TextContainer type="small" color={colorScheme.green300}>
              <TextContainer type="small" bold>
                Price change:{' '}
              </TextContainer>
              +{formatCurrency(changeAmount, CryptoStore.currency)} ({percent}%)
            </TextContainer>
          </View>
        ) : (
          <TextContainer type="small" color={colorScheme.red500}>
            <TextContainer type="small" bold>
              Price change:{' '}
            </TextContainer>{' '}
            {formatCurrency(changeAmount, CryptoStore.currency)} ({percent * -1}
            %)
          </TextContainer>
        )}
      </View>
    </View>
  );
};

export const CoinPrice = React.memo(Component);
