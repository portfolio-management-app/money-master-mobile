import React from 'react';
import { View } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { Button, Icon } from 'react-native-elements';
import { PlatformView } from 'components';
import { NavigationHeader } from 'navigation/header';
import { colorScheme, styleProvider } from 'styles';
import { LocaleStore } from 'stores/ui-store';

export const Login = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title="Login" />
      <Observer>
        {() => {
          const { locale } = LocaleStore;
          return (
            <View>
              <Button
                iconPosition="left"
                icon={
                  <Icon
                    name="googleplus"
                    tvParallaxProperties={{}}
                    type="antdesign"
                    color={colorScheme.red500}
                  ></Icon>
                }
                title={locale.loginPage.google}
              ></Button>
            </View>
          );
        }}
      </Observer>
    </PlatformView>
  );
};
