import React, { useEffect } from 'react';
import { StyleSheet, Image, View, StatusBar } from 'react-native';
import { Button } from 'react-native-elements';
import { observer } from 'mobx-react-lite';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { imageSource } from 'assets/images';
import { PlatformView, TextContainer } from 'shared/components';
import { colorScheme, dimensionProvider, styleProvider } from 'shared/styles';
import { LocaleStore, UserStore } from 'shared/stores';
import { screenName } from 'navigation/screen-names';
import { WaveIndicator } from 'react-native-indicators';

export const Start = observer(() => {
  const navigation = useNavigation();

  const { locale } = LocaleStore;
  const { pendingAuthen, user } = UserStore;
  useEffect(() => {
    if (!pendingAuthen) {
      if (user.isLoggedIn) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: screenName.home }],
          })
        );
      }
    } else {
      storage
        .load({ key: TOKEN_KEY })
        .then((value) => {
          console.log('Loaded token', value);
          UserStore.initUser(value);
        })
        .catch((error) => {
          UserStore.initUser(null);
          console.warn(error.message);
          switch (error.name) {
            case 'NotFoundError':
              console.log('NOT FOUND TOKEN');
              //TODO
              break;
            case 'ExpiredError':
              console.log('TOKEN EXPIRED');
              //TODO
              break;
          }
        });
    }
  }, [pendingAuthen, user]);
  return (
    <>
      <StatusBar backgroundColor={colorScheme.white} barStyle="dark-content" />
      {pendingAuthen ? (
        <PlatformView style={styles.container}>
          <WaveIndicator size={80} color={colorScheme.theme} />
        </PlatformView>
      ) : (
        <>
          {!user.isLoggedIn ? (
            <PlatformView style={styles.container}>
              <View style={styles.iconContainer}>
                <Image
                  style={styles.appIcon}
                  source={imageSource.appIcon}
                ></Image>
                <TextContainer style={{ marginLeft: 10 }}>
                  Money Master
                </TextContainer>
              </View>

              <Image style={styles.image} source={imageSource.banner}></Image>

              <TextContainer style={{ fontWeight: 'bold' }} type="h4">
                {locale.greetingPage.intro}
              </TextContainer>
              <StatusBar
                backgroundColor={colorScheme.bg}
                barStyle={'dark-content'}
              />
              <View style={styles.buttonContainer}>
                <Button
                  onPress={() =>
                    navigation.navigate(screenName.register as never)
                  }
                  containerStyle={[styleProvider.button, styles.loginButton]}
                  type="solid"
                  title={locale.greetingPage.register}
                ></Button>
                <Button
                  onPress={() => navigation.navigate(screenName.login as never)}
                  containerStyle={[
                    styleProvider.button,
                    { borderColor: colorScheme.theme },
                  ]}
                  type="clear"
                  title={locale.greetingPage.login}
                ></Button>
              </View>
            </PlatformView>
          ) : (
            <PlatformView style={styleProvider.body}>
              <WaveIndicator size={80} color={colorScheme.theme} />
            </PlatformView>
          )}
        </>
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: colorScheme.white,
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
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

  loginButton: {
    backgroundColor: colorScheme.theme,
    marginVertical: 20,
    borderColor: colorScheme.theme,
  },
});
