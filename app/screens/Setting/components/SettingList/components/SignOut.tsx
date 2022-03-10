import { CommonActions, useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import { ConfirmModal, Icon } from 'shared/components';
import { UserStore } from 'shared/stores';
import { colorScheme } from 'shared/styles';
import { ICON_SIZE, SCREEN_CONTENT } from '../../constant';
import { Common } from './Common';

export const SignOut = () => {
  const [open, setOpen] = React.useState(false);
  const navigation = useNavigation();

  const onSignOut = () => {
    UserStore.logout();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: screenName.start }],
      })
    );
  };
  return (
    <>
      <Common
        onPress={() => setOpen(true)}
        icon={
          <Icon.Material
            size={ICON_SIZE}
            color={colorScheme.black200}
            name="logout"
          />
        }
        title={SCREEN_CONTENT.signOut}
      />
      <ConfirmModal
        onDismiss={() => setOpen(false)}
        visible={open}
        title={SCREEN_CONTENT.signOutConfirm}
        onCancelPress={() => setOpen(false)}
        onConfirmPress={onSignOut}
      />
    </>
  );
};
