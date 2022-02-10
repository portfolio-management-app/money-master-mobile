import React from 'react';
import { Observer } from 'mobx-react-lite';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { NavigationHeader } from 'navigation/header';
import { PlatformView } from 'shared/components';
import { LocaleStore } from 'shared/stores';
import {
  colorScheme,
  dimensionProvider,
  iconProvider,
  styleProvider,
} from 'shared/styles';
import { imageSource } from 'assets/images';

export const ForgetPassword = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar
        backgroundColor={colorScheme.white}
        barStyle={'dark-content'}
      />
      <Observer>
        {() => {
          const { locale } = LocaleStore;
          return (
            <>
              <NavigationHeader title={locale.forgetPasswordPage.header} />
              <View style={styles.container}>
                <Image
                  style={styles.image}
                  source={imageSource.forgetPassword}
                ></Image>
                <Input
                  autoCompleteType={true}
                  placeholder={locale.loginPage.placeHolder.email}
                  leftIcon={{
                    type: iconProvider.fontisto,
                    name: 'email',
                    color: colorScheme.gray600,
                  }}
                />
                <Button
                  containerStyle={[styleProvider.button, styles.sendButton]}
                  title={locale.forgetPasswordPage.send}
                ></Button>
              </View>
            </>
          );
        }}
      </Observer>
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  image: {
    width: dimensionProvider.width,
    height: dimensionProvider.width,
  },
  sendButton: {
    borderColor: colorScheme.theme,
    backgroundColor: colorScheme.theme,
  },
});
