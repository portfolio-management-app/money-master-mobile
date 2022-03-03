import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog, Switch, View } from 'react-native-ui-lib';
import { Icon, TextContainer } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { ICON_SIZE, SCREEN_CONTENT } from '../../constant';
import { Common } from './Common';

type SwitchNotification = {
  email: boolean;
  inApp: boolean;
};

export const Notification = () => {
  const [open, setOpen] = React.useState(false);
  const [switchValues, setSwitchValues] = React.useState<SwitchNotification>({
    email: true,
    inApp: true,
  });
  return (
    <>
      <Dialog onDismiss={() => setOpen(false)} visible={open}>
        <View style={styleProvider.dialog}>
          <TextContainer bold mb={20} type="h3">
            {SCREEN_CONTENT.notificationSetting.header}
          </TextContainer>
          <View style={styles.switch}>
            <TextContainer type="h4">
              {SCREEN_CONTENT.notificationSetting.email}
            </TextContainer>
            <Switch
              offColor={colorScheme.gray400}
              onColor={colorScheme.theme}
              value={switchValues.email}
              onValueChange={() =>
                setSwitchValues({ ...switchValues, email: !switchValues.email })
              }
            />
          </View>
          <View style={styles.switch}>
            <TextContainer type="h4">
              {SCREEN_CONTENT.notificationSetting.inApp}
            </TextContainer>
            <Switch
              offColor={colorScheme.gray400}
              onColor={colorScheme.theme}
              value={switchValues.inApp}
              onValueChange={() =>
                setSwitchValues({ ...switchValues, inApp: !switchValues.inApp })
              }
            />
          </View>
        </View>
      </Dialog>
      <Common
        onPress={() => setOpen(true)}
        icon={
          <Icon.Material
            size={ICON_SIZE}
            color={colorScheme.black200}
            name="notifications"
          />
        }
        title={SCREEN_CONTENT.notification}
      />
    </>
  );
};

const styles = StyleSheet.create({
  switch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});
