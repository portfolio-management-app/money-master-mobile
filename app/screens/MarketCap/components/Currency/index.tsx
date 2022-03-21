import axios from 'axios';
import { Config } from 'config';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { currencyList } from 'shared/components/CurrencyPicker/constants';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { SearchModal } from './components';

type ResponseType = {
  timestamp: number;
  base: string;
  rates: any;
};
const CONTENT = APP_CONTENT.marketCap;

export const CurrencyMarket = () => {
  const [rate, setRate] = React.useState<ResponseType>();

  React.useEffect(() => {
    async function getRateData() {
      const res = await axios.get(
        `${Config.CURRENCY_API_URL}/latest.json?app_id=${Config.CURRENCY_API_KEY}`
      );
      setRate(res.data);
    }
    getRateData();
  }, []);
  return (
    <View>
      <TextContainer ml={20} mt={20} mb={20}>
        {CONTENT.base}: <TextContainer bold>USD</TextContainer>
      </TextContainer>
      <SearchModal rates={rate?.rates} />
      <ScrollView>
        <View style={[styleProvider.relativeView, styles.container]}>
          {rate && (
            <>
              {Object.keys(rate.rates).map((key: string) => {
                return (
                  <View style={styleProvider.card} key={key}>
                    <View>
                      <View
                        style={[
                          styleProvider.centerHorizontal,
                          { paddingBottom: 10 },
                        ]}
                      >
                        <TextContainer bold>{key} </TextContainer>
                        <TextContainer>({currencyList[key]})</TextContainer>
                      </View>
                      <View style={styleProvider.centerHorizontal}>
                        <TextContainer>{CONTENT.value}: </TextContainer>
                        <TextContainer color={colorScheme.blue200}>
                          {rate.rates[key]}
                        </TextContainer>
                      </View>
                    </View>
                  </View>
                );
              })}
            </>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  currencyItem: {
    flexDirection: 'row',
  },
  container: {},
});
