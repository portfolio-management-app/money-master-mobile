import { observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CoinDetailStore } from 'shared/stores';
import { colorScheme } from 'shared/styles';
import { parseToString } from 'utils/date';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.cryptoDetail;
const MT = 10;
export const CoinInfo = observer(() => {
  const { coinInfo, currency } = CoinDetailStore;
  return (
    <View style={{ paddingHorizontal: 20, paddingTop: 20 }}>
      <TextContainer color={colorScheme.blue200}>
        <TextContainer bold>{CONTENT.ath}: </TextContainer>
        {formatCurrency(coinInfo.ath, currency)}
        <TextContainer
          color={
            coinInfo.athPercent > 0 ? colorScheme.green300 : colorScheme.red500
          }
        >
          {' '}
          ({coinInfo.athPercent}%)
        </TextContainer>
      </TextContainer>
      <TextContainer mt={MT}>
        <TextContainer bold>{CONTENT.athDate}: </TextContainer>
        {parseToString(new Date(coinInfo.athDate))}
      </TextContainer>
      <TextContainer mt={MT}>
        <TextContainer bold>{CONTENT.marketCapRank}: </TextContainer>
        {coinInfo.marketCapRank}
      </TextContainer>
      <TextContainer mt={MT}>
        <TextContainer bold>{CONTENT.maxSupply}: </TextContainer>
        {coinInfo.maxSupply}
      </TextContainer>
      <TextContainer mt={MT}>
        <TextContainer bold>{CONTENT.circulatingSupply}: </TextContainer>{' '}
        {coinInfo.circulatingSupply}
      </TextContainer>
      <TextContainer mt={MT}>
        <TextContainer bold>{CONTENT.lastUpdate}: </TextContainer>{' '}
        {parseToString(new Date(coinInfo.lastUpdate))}
      </TextContainer>
    </View>
  );
});