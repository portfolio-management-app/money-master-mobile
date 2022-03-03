import React from 'react';
import { View } from 'react-native-ui-lib';
import {
  FocusAwareStatusBar,
  PlatformView,
  SearchBar,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { TabBarView } from './components';

export const MarketCap = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <View style={[styleProvider.searchBarTheme, { paddingTop: 30 }]}>
        <SearchBar
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
      <TabBarView />
    </PlatformView>
  );
};
