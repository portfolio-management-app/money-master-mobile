import { Config } from 'config';
import { HttpError } from 'errors/base';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { httpRequest } from 'services/api';
import {
  SearchForData,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { CurrencyDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

type SearchResult = {
  decimal: string;
  id: string;
  name: string;
  short_name: string;
  type: string;
};

interface IProps {
  onItemPress?: (id: string, name: string, symbol: string) => void;
  text: string;
}

const Component = ({ onItemPress, text }: IProps) => {
  const [loading, setLoading] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<Array<SearchResult>>(
    []
  );

  const startSearching = React.useCallback(async (query: string) => {
    setLoading(true);
    const res = await httpRequest.sendGet(
      `${Config.CURRENCY_API_URL}/search?s=${query}&access_key=${Config.CURRENCY_API_KEY}`
    );

    if (res instanceof HttpError) {
      console.log(res);
    } else {
      setSearchResult(res.response);
    }
    setLoading(false);
  }, []);

  const handleItemPress = (id: string, name: string, symbol: string) => {
    if (onItemPress) {
      onItemPress(id, name, symbol);
    }
  };

  React.useEffect(() => {
    if (text !== '') {
      startSearching(text);
    }
  }, [startSearching, text]);

  return (
    <View style={styleProvider.relativeView}>
      <Observer>
        {() => {
          return (
            <TransparentLoading show={loading || CurrencyDetailStore.loading} />
          );
        }}
      </Observer>

      {searchResult.length ? (
        <ScrollView>
          {searchResult.map((result) => (
            <TouchableOpacity
              onPress={() =>
                handleItemPress(result.id, result.name, result.short_name)
              }
              style={styleProvider.card}
              key={result.id}
            >
              <TextContainer bold>{result.short_name}</TextContainer>
              <TextContainer style={{ flex: 1 }} ml={15}>
                {result.name}
              </TextContainer>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <SearchForData />
      )}
    </View>
  );
};

export const CurrencySearchResult = React.memo(Component);
