import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Observer } from 'mobx-react-lite';
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
import { CommonActions, useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import { HttpRequestResponse } from 'shared/types';
import { ErrorBounder } from './components';
import { useAuthentication, useSocialLogin } from '../hooks';
import { log } from 'services/log-service';

export const Login = () => {
  const [isLoading, setEmail, setPassword, error, submit] = useAuthentication();
  const [apiResponse, setApiResponse] = React.useState<HttpRequestResponse>({
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
  const onLogin = async () => {
    const res = await submit('login');
    log('__LOGIN_', res);
    if (res) {
      if (res.isError)
        setApiResponse({ isError: true, response: res.response });
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
              <NavigationHeader title={locale.loginPage.header} />
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

                  <View style={styles.forgetContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(screenName.forgetPassword as never)
                      }
                    >
                      <TextContainer
                        style={{ color: colorScheme.theme }}
                        type="small"
                      >
                        {locale.loginPage.forgetPassword}
                      </TextContainer>
                    </TouchableOpacity>
                  </View>
                </View>
                <BaseButton
                  onPress={onLogin}
                  labelStyle={{ color: colorScheme.theme }}
                  label={locale.greetingPage.login}
                  style={styles.loginButton}
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
                    <TextContainer>{locale.loginPage.signUpLink}</TextContainer>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate(screenName.register as never)
                      }
                    >
                      <TextContainer style={styles.signInLink}>
                        {locale.registerPage.header}
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

export const styles = StyleSheet.create({
  form: {
    paddingHorizontal: 20,
  },
  signInLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signInLink: {
    color: colorScheme.theme,
    marginLeft: 5,
  },
  loginButton: {
    backgroundColor: colorScheme.white,
    borderWidth: 1,
    borderColor: colorScheme.theme,
    marginTop: 20,
  },
  forgetContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight: 10,
  },
  googleButton: {
    borderColor: colorScheme.red500,
    backgroundColor: colorScheme.red500,
  },

  facebookButton: {
    borderColor: colorScheme.blue300,
    backgroundColor: colorScheme.blue300,
    marginTop: 30,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
  },
  inputContainer: {
    marginTop: 20,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
