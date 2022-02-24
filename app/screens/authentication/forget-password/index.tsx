import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationHeader } from 'navigation/header';
import { PlatformView } from 'shared/components';
import { colorScheme, dimensionProvider, styleProvider } from 'shared/styles';
import { imageSource } from 'assets/images';
import { i18n } from 'i18n';
import { i18Key } from 'services/storage';

const localeData = i18n[i18Key].forgetPasswordPage;

export const ForgetPassword = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={localeData.header} />
      <View style={styles.container}>
        <Image style={styles.image} source={imageSource.forgetPassword}></Image>
      </View>
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
