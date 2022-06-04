import React from 'react';
import { Switch, View } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.assetNotificationSetting;

export const NewSetting = () => {
  const [check, setCheck] = React.useState(false);
  return (
    <View
      style={[
        styleProvider.centerHorizontal,
        styleProvider.container,
        { marginTop: 30 },
      ]}
    >
      <TextContainer style={{ flex: 1 }} ml={10}>
        {CONTENT.notificationNew}
      </TextContainer>
      <Switch
        onColor={colorScheme.theme}
        onValueChange={() => setCheck(!check)}
        value={check}
      />
    </View>
  );
};
