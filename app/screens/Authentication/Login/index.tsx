import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  BaseButton,
  CustomTextField,
  Loading,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { NavigationHeader } from 'navigation/header';
import { colorScheme, styleProvider } from 'shared/styles';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { screenName } from 'navigation/screen-names';
import { HttpRequestResponse } from 'shared/types';
import { ErrorBounder } from './components';
import { useSocialLogin } from '../hooks';
import { Formik } from 'formik';
import { log } from 'services/log';
import { AuthenticationSchema } from '../validator';
import { UserStore } from 'shared/stores';
import { imageSource } from 'assets/images';
import { APP_CONTENT } from 'shared/constants';

const LOGIN_CONTENT = APP_CONTENT.loginPage;

export const Login = () => {
  const [apiResponse, setApiResponse] = React.useState<HttpRequestResponse>({
    isError: false,
    response: null,
  });

  const [loading, handleFaceBookLogin, handleGoogleLogin, setLoading] =
    useSocialLogin();

  const navigation = useNavigation();

  const onLogin = async (email: string, password: string) => {
    setLoading(true);
    const res = await UserStore.login(email, password);
    log('__LOGIN_', res);
    setLoading(false);
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
      <Loading show={loading} />
      <ErrorBounder
        onClose={() => setApiResponse({ isError: false, response: null })}
        show={apiResponse.isError}
        res={apiResponse.response}
      />

      <NavigationHeader title={LOGIN_CONTENT.header} />
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={AuthenticationSchema}
            onSubmit={(values) => {
              onLogin(values.email, values.password);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <>
                  <CustomTextField
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    errorMessage={touched.email ? errors.email : ''}
                    placeholder={LOGIN_CONTENT.placeHolder.email}
                  />
                  <CustomTextField
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    secureText
                    errorMessage={touched.password ? errors.password : ''}
                    placeholder={LOGIN_CONTENT.placeHolder.password}
                  />
                  <BaseButton
                    onPress={handleSubmit}
                    labelStyle={{ color: colorScheme.theme }}
                    label={LOGIN_CONTENT.header.toUpperCase()}
                    style={styles.loginButton}
                  />
                </>
              );
            }}
          </Formik>

          <View style={styles.forgetContainer}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate(screenName.forgetPassword as never)
              }
            >
              <TextContainer color={colorScheme.theme} type="small">
                {LOGIN_CONTENT.forgetPassword}
              </TextContainer>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.textContainer}>
          <TextContainer color={colorScheme.theme}>OR</TextContainer>
        </View>

        <View style={styles.buttonContainer}>
          <BaseButton
            iconSource={imageSource.google}
            iconStyle={styleProvider.buttonIcon}
            style={styles.googleButton}
            label={LOGIN_CONTENT.google}
            onPress={handleGoogleLogin}
          />
          <BaseButton
            iconSource={imageSource.facebook}
            iconStyle={styleProvider.buttonIcon}
            style={styles.facebookButton}
            onPress={handleFaceBookLogin}
            label={LOGIN_CONTENT.facebook}
          />

          <View style={styles.signInLinkContainer}>
            <TextContainer>{LOGIN_CONTENT.signUpLink} </TextContainer>
            <TouchableOpacity
              onPress={() => navigation.navigate(screenName.register as never)}
            >
              <TextContainer color={colorScheme.theme}>
                {LOGIN_CONTENT.register}
              </TextContainer>
            </TouchableOpacity>
          </View>
        </View>
      </View>
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

  loginButton: {
    backgroundColor: colorScheme.white,
    borderWidth: 1,
    borderColor: colorScheme.theme,
    marginVertical: 20,
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
