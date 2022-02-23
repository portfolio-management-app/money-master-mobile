import React from 'react';
import { Observer } from 'mobx-react-lite';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationHeader } from 'navigation/header';
import { PlatformView } from 'shared/components';
import { LocaleStore } from 'shared/stores';
import { colorScheme, dimensionProvider, styleProvider } from 'shared/styles';
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
