import React from 'react';
import { StyleSheet, Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import { Observer } from 'mobx-react-lite';
import { useNavigation } from '@react-navigation/native';
import { imageSource } from 'assets/images';
import { PlatformView, TextContainer } from 'components';
import { colorScheme, dimensionProvider } from 'styles';
import { LocaleStore } from 'stores/ui-store';
import { screenName } from 'navigation/screen-names';

export const Start = () => {
  const navigation = useNavigation();
  return (
    <PlatformView style={styles.container}>
      <View style={styles.iconContainer}>
        <Image style={styles.appIcon} source={imageSource.appIcon}></Image>
        <TextContainer style={{ marginLeft: 10 }}>Money Master</TextContainer>
      </View>

      <Image style={styles.image} source={imageSource.banner}></Image>

      <Observer>
        {() => {
          const { locale } = LocaleStore;
          return (
            <>
              <TextContainer style={{ fontWeight: 'bold' }} type="h4">
                {locale.greetingPage.intro}
              </TextContainer>
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() => navigation.navigate(screenName.login as never)}
                  containerStyle={[styles.button, styles.loginButton]}
                  type="solid"
                  title={locale.greetingPage.login}
                ></Button>
                <Button
                  containerStyle={[styles.button]}
                  type="clear"
                  title={locale.greetingPage.register}
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
    backgroundColor: colorScheme.white,
    flex: 1,
    alignItems: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    marginLeft: 20,
  },
  appIcon: {
    width: 40,
    height: 40,
  },
  image: {
    width: dimensionProvider.width,
    height: dimensionProvider.width + 50,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    width: '100%',
    paddingVertical: 5,
    borderColor: colorScheme.theme,
    borderWidth: 1,
  },
  loginButton: {
    backgroundColor: colorScheme.theme,
    marginVertical: 20,
  },
});