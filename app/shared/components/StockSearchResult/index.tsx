import { Config } from 'config';
import { HttpError } from 'errors/base';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { httpRequest } from 'services/api';
import { SearchForData, TextContainer } from 'shared/components';
import { StockDetailStore } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { TransparentLoading } from '../Loading/TransparentLoading';

type SearchResult = {
  symbol: string;
  instrument_name: string;
  exchange: string;
  exchange_timezone: string;
  instrument_type: string;
  country: string;
  currency: string;
};

interface IProps {
  onStockPress?: (symbol: string) => void;
  text: string;
}

const Component = ({ onStockPress, text }: IProps) => {
  const [loading, setLoading] = React.useState(false);
  const [searchResult, setSearchResult] = React.useState<Array<SearchResult>>(
    []
  );

  const startSearching = React.useCallback(async (query: string) => {
    setLoading(true);
    const res = await httpRequest.sendGet(
      `${Config.STOCK_API_URL}/symbol_search?symbol=${query}`
    );

    if (res instanceof HttpError) {
      console.log(res);
    } else {
      setSearchResult(res.data);
    }
    setLoading(false);
  }, []);

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
            <TransparentLoading show={loading || StockDetailStore.loading} />
          );
        }}
      </Observer>
      {searchResult.length ? (
        <ScrollView>
          {searchResult.map((result, id) => (
            <TouchableOpacity
              onPress={() => {
                onStockPress && onStockPress(result.symbol);
              }}
              style={styleProvider.card}
              key={id}
            >
              <TextContainer bold>{result.symbol}</TextContainer>
              <TextContainer ml={15}>{result.instrument_name}</TextContainer>
            </TouchableOpacity>
          ))}
        </ScrollView>
      ) : (
        <SearchForData />
      )}
    </View>
  );
};

export const StockSearchResult = React.memo(Component);
