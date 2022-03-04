import React from 'react';
import { View } from 'react-native-ui-lib';
import {
  FocusAwareStatusBar,
  FocusSearchBar,
  PlatformView,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { SearchModalMarket } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { TabBarView } from './components';

const Component = () => {
  const [tabIndex, setTabIndex] = React.useState(0);

  const handleOpenSearchModal = () => {
    switch (tabIndex) {
      case 0:
        SearchModalMarket.toggleCryptoSearch();
    }
  };
  return (
    <PlatformView style={styleProvider.body}>
      <View style={[styleProvider.searchBarTheme, { paddingTop: 30 }]}>
        <FocusSearchBar
          onFocus={handleOpenSearchModal}
          borderColor={colorScheme.white}
          iconColor={colorScheme.white}
          textColor={colorScheme.white}
          selectionColor={colorScheme.white}
          placeHolderTextColor={colorScheme.gray100}
          placeholder={APP_CONTENT.searchBar.placeholder}
        />
      </View>
      <FocusAwareStatusBar
        backgroundColor={colorScheme.theme}
        barStyle="light-content"
      />
      <TabBarView onViewChange={setTabIndex} />
    </PlatformView>
  );
};
export const MarketCap = React.memo(Component);
