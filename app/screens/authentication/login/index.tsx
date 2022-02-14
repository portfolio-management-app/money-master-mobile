import React from 'react';
import { StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Observer } from 'mobx-react-lite';
import { Button, Input } from 'react-native-elements';
import { Loading, PlatformView, TextContainer } from 'shared/components';
import { NavigationHeader } from 'navigation/header';
import { colorScheme, iconProvider, styleProvider } from 'shared/styles';
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
      <StatusBar backgroundColor={colorScheme.bg} barStyle={'dark-content'} />
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
                  <Input
                    autoCompleteType={true}
                    placeholder={locale.loginPage.placeHolder.email}
                    leftIcon={{
                      type: iconProvider.fontisto,
                      name: 'email',
                      color: colorScheme.gray600,
                    }}
                    onChangeText={handleEmailChange}
                    errorMessage={error.emailMessage}
                  />
                  <Input
                    secureTextEntry={true}
                    autoCompleteType={true}
                    placeholder={locale.loginPage.placeHolder.password}
                    leftIcon={{
                      type: iconProvider.simpleLineIcon,
                      name: 'lock',
                      color: colorScheme.gray600,
                    }}
                    onChangeText={handlePasswordChange}
                    errorMessage={error.passwordMessage}
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
                <Button
                  containerStyle={[styleProvider.button, styles.loginButton]}
                  type="clear"
                  onPress={onLogin}
                  title={locale.greetingPage.login}
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
                      type: 'antdesign',
                      name: 'googleplus',
                      color: colorScheme.white,
                    }}
                    onPress={handleGoogleLogin}
                    containerStyle={[styleProvider.button, styles.googleButton]}
                    title={locale.loginPage.google}
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
                    title={locale.loginPage.facebook}
                    titleStyle={{ color: colorScheme.white }}
                  ></Button>

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
    marginTop: 50,
  },
  buttonContainer: {
    marginTop: 20,
  },
});
