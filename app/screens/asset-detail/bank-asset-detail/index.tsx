import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { StatusBar } from 'react-native';
import { View } from 'react-native-ui-lib';
import { Icon, PlatformView, SpeedDial } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { Information, SpeedDialButtons, TransactionList } from './components';

export const BankAssetDetail = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader
        title={ASSET_DETAIL_CONTENT.headerBanking}
        renderRightItem={() => (
          <Icon.Ioni
            name="settings"
            size={25}
            style={{ marginRight: 10 }}
            color={colorScheme.black200}
          />
        )}
      />
      <View style={styleProvider.container}>
        <Information />
      </View>
      <TransactionList />
      <SpeedDial renderItems={() => <SpeedDialButtons />} />
    </PlatformView>
  );
};
