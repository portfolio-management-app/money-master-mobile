import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import {
  BaseButton,
  CustomTextField,
  Loading,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { NavigationHeader } from 'navigation/header';
import { colorScheme, styleProvider } from 'shared/styles';
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
                  <CustomTextField
                    onChangeText={handleEmailChange}
                    errorMessage={error.emailMessage}
                    placeholder={locale.loginPage.placeHolder.email}
                  />
                  <CustomTextField
                    onChangeText={handlePasswordChange}
                    secureText
                    errorMessage={error.passwordMessage}
                    placeholder={locale.loginPage.placeHolder.password}
                  />
                </View>
                <BaseButton
                  style={registerStyle.registerButton}
                  onPress={onRegister}
                  label={locale.greetingPage.register}
                />
                <View style={styles.textContainer}>
                  <TextContainer style={{ color: colorScheme.theme }}>
                    OR
                  </TextContainer>
                </View>
                <View style={styles.buttonContainer}>
                  <BaseButton
                    style={styles.googleButton}
                    label={locale.loginPage.google}
                    onPress={handleGoogleLogin}
                  />
                  <BaseButton
                    style={styles.facebookButton}
                    onPress={handleFaceBookLogin}
                    label={locale.loginPage.facebook}
                  />
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
