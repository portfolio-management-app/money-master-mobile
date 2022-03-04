import { COIN_API_URL } from 'config';
import { HttpError } from 'errors/base';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import { Modal, TouchableOpacity, View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/market-cap/constant';
import { httpRequest } from 'services/api';
import {
  BackSearchBar,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { SearchModalMarket } from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { useDebounce } from 'use-debounce';

type SearchResult = {
  id: string;
  name: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
};

const Component = () => {
  const [text, setText] = React.useState('');
  const [value] = useDebounce(text, 500);
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
    if (value !== '') {
      startSearching(value);
    }
  }, [startSearching, value]);

  return (
    <Modal
      onRequestClose={() => SearchModalMarket.toggleCryptoSearch()}
      animationType="fade"
      visible={SearchModalMarket.cryptoSearch}
    >
      <BackSearchBar
        onChangeText={setText}
        placeholder={SCREEN_CONTENT.cryptoSearchPlaceholder}
        onPressBack={() => SearchModalMarket.toggleCryptoSearch()}
      />
      <View style={styleProvider.relativeView}>
        <TransparentLoading show={loading} />
        <ScrollView>
          {searchResult.map((result) => (
            <TouchableOpacity
              style={styleProvider.marketCapSearchResult}
              key={result.id}
            >
              <TextContainer>{result.name}</TextContainer>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Modal>
  );
};

export const SearchModal = observer(Component);
