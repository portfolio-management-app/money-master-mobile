import React from 'react';
import { StatusBar } from 'react-native';
import { UserStore } from 'shared/stores';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import { BaseButton, PlatformView, TextContainer } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { LanguageSetting } from './components';

export const Account = () => {
  const navigation = useNavigation();
  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar
        backgroundColor={colorScheme.white}
        barStyle={'dark-content'}
      />
      <TextContainer>
        {UserStore.user.email} {UserStore.user.token}
      </TextContainer>
      <LanguageSetting />
      <BaseButton
        label="Logout"
        onPress={() => {
          UserStore.logout();
          navigation.dispatch(
            CommonActions.reset({
              index: 0,
              routes: [{ name: screenName.start }],
            })
          );
        }}
      />
    </PlatformView>
  );
};
