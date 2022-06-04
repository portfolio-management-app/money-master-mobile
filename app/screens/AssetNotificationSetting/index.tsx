import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import { Icon, PlatformView } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import {
  NewSetting,
  NotiPriceInfo,
  PriceInputModal,
  PriceSetting,
} from './components';

const CONTENT = APP_CONTENT.assetNotificationSetting;

export const AssetNotificationSetting = () => {
  const [showDialog, setShowDialog] = React.useState(false);
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.navigationHeader} />
      <PriceSetting />
      <View
        style={[
          styleProvider.centerHorizontal,
          { paddingHorizontal: 30, marginTop: 10 },
        ]}
      >
        <NotiPriceInfo />
        <Icon.Material
          name="edit"
          color={colorScheme.black200}
          size={25}
          style={{ marginLeft: 20 }}
          onPress={() => setShowDialog(!showDialog)}
        />
      </View>

      <NewSetting />
      <PriceInputModal
        show={showDialog}
        onClose={() => setShowDialog(!setShowDialog)}
      />
    </PlatformView>
  );
};
