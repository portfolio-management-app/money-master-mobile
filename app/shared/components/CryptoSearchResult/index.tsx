import { COIN_API_URL } from 'config';
import { HttpError } from 'errors/base';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import { Image, TouchableOpacity, View } from 'react-native-ui-lib';
import { httpRequest } from 'services/api';
import {
  SearchForData,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { CoinDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';

type SearchResult = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

interface IProps {
  onCoinPress?: (id: string, name: string) => void;
  text: string;
}

const Component = ({ onCoinPress, text }: IProps) => {
  const [loading, setLoading] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<Array<SearchResult>>(
    []
  );

  const startSearching = React.useCallback(async (query: string) => {
    setLoading(true);
    const res = await httpRequest.sendGet(
      `${COIN_API_URL}/search?query=${query}`
    );

    if (res instanceof HttpError) {
      console.log(res);
    } else {
      setSearchResult(res.coins);
    }
    setLoading(false);
  }, []);

  React.useEffect(() => {
    if (text !== '') {
      startSearching(text);
    }
  }, [startSearching, text]);

  const onItemPress = React.useCallback(
    (id: string, name: string) => {
      if (onCoinPress) {
        onCoinPress(id, name);
      }
    },
    [onCoinPress]
  );

  return (
    <View style={styleProvider.relativeView}>
      <Observer>
        {() => {
          return (
            <TransparentLoading show={loading || CoinDetailStore.loading} />
          );
        }}
      </Observer>

      {searchResult.length ? (
        <ScrollView>
          {searchResult.map((result) => (
            <TouchableOpacity
              onPress={() => onItemPress(result.id, result.name)}
              style={styleProvider.card}
              key={result.id}
            >
              <Image
                style={styleProvider.buttonIcon}
                source={{ uri: result.large }}
              />
              <TextContainer ml={15}>{result.name}</TextContainer>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <SearchForData />
      )}
    </View>
  );
};

export const CryptoSearchResult = React.memo(Component);
