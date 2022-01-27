import React from 'react';
import { PlatformView } from 'components';
import { Observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { LocaleStore } from 'stores/ui-store';
import {
  colorScheme,
  dimensionProvider,
  iconProvider,
  styleProvider,
} from 'styles';
import { StyleSheet, View } from 'react-native';
import { Button, Image, Input } from 'react-native-elements';
import { imageSource } from 'assets/images';

export const ForgetPassword = () => {
  return (
    <PlatformView style={styleProvider.body}>
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
