import { imageSource } from 'assets/images';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Image, View } from 'react-native-ui-lib';
import { HyperLink, TextContainer } from 'shared/components';
import { APP_NAME } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { SCREEN_CONTENT } from './constant';

export const AppInfo = () => {
  return (
    <View
      style={[
        styleProvider.centerHorizontal,
        styleProvider.container,
        styles.container,
      ]}
    >
      <Image source={imageSource.appIcon} width={80} height={80} />
      <View style={styles.rightContainer}>
        <TextContainer bold color={colorScheme.theme}>
          {APP_NAME}
        </TextContainer>
        <View style={styleProvider.centerHorizontal}>
          <TextContainer type="small">
            {SCREEN_CONTENT.useImage}:{' '}
          </TextContainer>
          <HyperLink
            color={colorScheme.theme}
            title="Freepik"
            url="https://www.freepik.com"
            type="small"
          />
        </View>
        <TextContainer bold type="small">
          v.1.01
        </TextContainer>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rightContainer: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  container: {
    borderBottomColor: colorScheme.gray400,
    borderBottomWidth: 0.5,
    paddingVertical: 30,
  },
});
