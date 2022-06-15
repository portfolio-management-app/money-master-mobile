import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { CommonActions, useNavigation } from '@react-navigation/native';
import {
  BaseButton,
  CustomTextField,
  Loading,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { NavigationHeader } from 'navigation/header';
import { colorScheme, styleProvider } from 'shared/styles';
import { HttpRequestResponse } from 'shared/types';
import { useSocialLogin } from '../hooks';
import { styles } from '../Login';
import { ErrorBounder } from './components';
import { UserStore } from 'shared/stores';
import { Formik } from 'formik';
import { AuthenticationSchema } from '../validator';
import { imageSource } from 'assets/images';
import { APP_CONTENT } from 'shared/constants';
import { MainStackNavigationProp } from 'navigation/types';

const REGISTER_CONTENT = APP_CONTENT.registerPage;

export const Register = () => {
  const [apiResponse, setApiResponse] = useState<HttpRequestResponse>({
    isError: false,
    response: null,
  });

  const [loading, handleFaceBookLogin, handleGoogleLogin, setLoading] =
    useSocialLogin();

  const navigation = useNavigation<MainStackNavigationProp>();

  const onRegister = async (email: string, password: string) => {
    setLoading(true);
    const res = await UserStore.register(email, password);
    setLoading(false);
    if (res) {
      if (res.isError)
        setApiResponse({ isError: res.isError, response: res.response });
      else dispatchNavigate();
    }
  };

  const onGoogleLogin = async () => {
    setLoading(true);
    const token = await handleGoogleLogin();
    const res = await UserStore.googleLogin(token.idToken);
    setLoading(false);
    if (res) {
      if (res.isError)
        setApiResponse({ isError: true, response: res.response });
      else dispatchNavigate();
    }
  };

  const dispatchNavigate = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      })
    );
  };

  return (
    <PlatformView style={styleProvider.body}>
      <Loading show={loading} />
      <ErrorBounder
        onClose={() => setApiResponse({ isError: false, response: null })}
        show={apiResponse.isError}
        res={apiResponse.response}
      />

      <NavigationHeader title={REGISTER_CONTENT.header} />
      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={AuthenticationSchema}
            onSubmit={(values) => {
              onRegister(values.email, values.password);
            }}
          >
            {({ errors, touched, handleChange, handleBlur, handleSubmit }) => {
              return (
                <>
                  <CustomTextField
                    onBlur={handleBlur('email')}
                    onChangeText={handleChange('email')}
                    errorMessage={touched.email ? errors.email : ''}
                    placeholder={REGISTER_CONTENT.placeHolder.email}
                  />
                  <CustomTextField
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    secureText
                    errorMessage={touched.password ? errors.password : ''}
                    placeholder={REGISTER_CONTENT.placeHolder.password}
                  />
                  <BaseButton
                    onPress={handleSubmit}
                    labelStyle={{ color: colorScheme.theme }}
                    label={REGISTER_CONTENT.header.toUpperCase()}
                    style={styles.loginButton}
                  />
                </>
              );
            }}
          </Formik>
        </View>

        <View style={styles.textContainer}>
          <TextContainer color={colorScheme.theme}>
            {' '}
            {APP_CONTENT.or}
          </TextContainer>
        </View>
        <View style={styles.buttonContainer}>
          <BaseButton
            iconSource={imageSource.google}
            iconStyle={styleProvider.buttonIcon}
            style={styles.googleButton}
            label={REGISTER_CONTENT.google}
            onPress={onGoogleLogin}
          />
          <BaseButton
            iconStyle={styleProvider.buttonIcon}
            iconSource={imageSource.facebook}
            style={styles.facebookButton}
            onPress={handleFaceBookLogin}
            label={REGISTER_CONTENT.facebook}
          />
          <View style={styles.signInLinkContainer}>
            <TextContainer>{REGISTER_CONTENT.signInLink} </TextContainer>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <TextContainer color={colorScheme.theme}>
                {REGISTER_CONTENT.login}
              </TextContainer>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </PlatformView>
  );
};
