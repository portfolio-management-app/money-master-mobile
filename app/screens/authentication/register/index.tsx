import React, { useState } from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { Button, Input } from 'react-native-elements';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import { Loading, PlatformView, TextContainer } from 'shared/components';
import { NavigationHeader } from 'navigation/header';
import { colorScheme, iconProvider, styleProvider } from 'shared/styles';
import { LocaleStore } from 'shared/stores';
import { HttpRequestResponse } from 'shared/types';
import { useAuthentication, useSocialLogin } from '../hooks';
import { styles } from '../login';
import { ErrorBounder } from './components';

export const Register = () => {
  const [isLoading, setEmail, setPassword, error, submit] = useAuthentication();

  const [apiResponse, setApiResponse] = useState<HttpRequestResponse>({
    isError: false,
    response: null,
  });

  const [loading, handleFaceBookLogin, handleGoogleLogin] = useSocialLogin();

  const navigation = useNavigation();

  const handleEmailChange = (value: string) => {
    setEmail(value);
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const onRegister = async () => {
    const res = await submit('register');
    if (res) {
      if (res.isError)
        setApiResponse({ isError: res.isError, response: res.response });
      else
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: screenName.home }],
          })
        );
    }
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar
        backgroundColor={colorScheme.white}
        barStyle={'dark-content'}
      />
      <Loading show={loading || isLoading} />
      <ErrorBounder
        onClose={() => setApiResponse({ isError: false, response: null })}
        show={apiResponse.isError}
        res={apiResponse.response}
      />
      <Observer>
        {() => {
          const { locale } = LocaleStore;
          return (
            <>
              <NavigationHeader title={locale.registerPage.header} />
              <View style={styles.form}>
                <View style={styles.inputContainer}>
                  <Input
                    onChangeText={handleEmailChange}
                    autoCompleteType={true}
                    placeholder={locale.registerPage.placeHolder.email}
                    leftIcon={{
                      type: iconProvider.fontisto,
                      name: 'email',
                      color: colorScheme.gray600,
                    }}
                    errorMessage={error.emailMessage}
                  />
                  <Input
                    onChangeText={handlePasswordChange}
                    secureTextEntry={true}
                    autoCompleteType={true}
                    placeholder={locale.registerPage.placeHolder.password}
                    leftIcon={{
                      type: iconProvider.simpleLineIcon,
                      name: 'lock',
                      color: colorScheme.gray600,
                    }}
                    errorMessage={error.passwordMessage}
                  />
                </View>
                <Button
                  containerStyle={[
                    styleProvider.button,
                    registerStyle.registerButton,
                  ]}
                  type="solid"
                  onPress={onRegister}
                  title={locale.greetingPage.register}
                ></Button>
                <View style={styles.textContainer}>
                  <TextContainer style={{ color: colorScheme.theme }}>
                    OR
                  </TextContainer>
                </View>
                <View style={styles.buttonContainer}>
                  <Button
                    type="clear"
                    icon={{
                      type: iconProvider.antDesign,
                      name: 'googleplus',
                      color: colorScheme.white,
                    }}
                    onPress={handleGoogleLogin}
                    containerStyle={[styleProvider.button, styles.googleButton]}
                    title={locale.registerPage.google}
                    titleStyle={{ color: colorScheme.white }}
                  ></Button>
                  <Button
                    onPress={handleFaceBookLogin}
                    type="clear"
                    icon={{
                      type: 'fontawesome',
                      name: 'facebook',
                      color: colorScheme.white,
                    }}
                    containerStyle={[
                      styleProvider.button,
                      styles.facebookButton,
                    ]}
                    title={locale.registerPage.facebook}
                    titleStyle={{ color: colorScheme.white }}
                  ></Button>
                  <View style={styles.signInLinkContainer}>
                    <TextContainer>
                      {locale.registerPage.signInLink}
                    </TextContainer>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(screenName.login as never)
                      }
                    >
                      <TextContainer style={styles.signInLink}>
                        {locale.loginPage.header}
                      </TextContainer>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          );
        }}
      </Observer>
    </PlatformView>
  );
};

const registerStyle = StyleSheet.create({
  registerButton: {
    borderColor: colorScheme.theme,
    backgroundColor: colorScheme.theme,
    marginTop: 20,
  },
});
