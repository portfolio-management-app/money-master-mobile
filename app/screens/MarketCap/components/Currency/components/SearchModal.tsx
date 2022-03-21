import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Modal } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/MarketCap/constant';
import { BackSearchBar, TextContainer } from 'shared/components';
import { currencyList } from 'shared/components/CurrencyPicker/constants';
import { APP_CONTENT } from 'shared/constants';
import { SearchModalMarket } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { useDebounce } from 'use-debounce';

interface IProps {
  rates?: any;
}

const CONTENT = APP_CONTENT.marketCap;

const Component = ({ rates }: IProps) => {
  const [text, setText] = React.useState('');
  const [value] = useDebounce(text, 500);
  const [searchResult, setSearchResult] = React.useState<Array<string>>([]);

  React.useEffect(() => {
    if (rates) {
      const filter = Object.keys(rates).filter((key: string) => {
        const lower = value.toLowerCase();
        if (
          key.toLowerCase().includes(lower) ||
          (currencyList[key] && currencyList[key].toLowerCase().includes(lower))
        ) {
          return true;
        }
        return false;
      });

      setSearchResult(filter);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, rates]);

  return (
    <Modal
      onRequestClose={() => SearchModalMarket.toggleCurrencySearch()}
      animationType="fade"
      visible={SearchModalMarket.currencySearch}
    >
      <BackSearchBar
        onChangeText={setText}
        placeholder={SCREEN_CONTENT.currencySearchPlaceholder}
        onPressBack={() => SearchModalMarket.toggleCurrencySearch()}
      />
      <TextContainer ml={20} mt={20} mb={20}>
        {CONTENT.base}: <TextContainer bold>USD</TextContainer>
      </TextContainer>
      <ScrollView>
        <View style={styleProvider.relativeView}>
          {searchResult.map((value) => (
            <View style={styleProvider.card} key={value}>
              <View>
                <View
                  style={[
                    styleProvider.centerHorizontal,
                    { paddingBottom: 10 },
                  ]}
                >
                  <TextContainer bold>{value} </TextContainer>
                  <TextContainer>({currencyList[value]})</TextContainer>
                </View>
                <View style={styleProvider.centerHorizontal}>
                  <TextContainer>{CONTENT.value}: </TextContainer>
                  <TextContainer color={colorScheme.blue200}>
                    {rates[value]}
                  </TextContainer>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </Modal>
  );
};

export const SearchModal = observer(Component);
