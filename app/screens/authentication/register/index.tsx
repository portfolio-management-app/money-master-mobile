import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
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
import { HttpRequestResponse } from 'shared/types';
import { useSocialLogin } from '../hooks';
import { styles } from '../login';
import { ErrorBounder } from './components';
import { i18n } from 'i18n';
import { localeKey } from 'services/storage';
import { UserStore } from 'shared/stores';
import { Formik } from 'formik';
import { AuthenticationSchema } from '../validator';
import { imageSource } from 'assets/images';

const REGISTER_CONTENT = i18n[localeKey].registerPage;

export const Register = () => {
  const [apiResponse, setApiResponse] = useState<HttpRequestResponse>({
    isError: false,
    response: null,
  });

  const [loading, handleFaceBookLogin, handleGoogleLogin, setLoading] =
    useSocialLogin();

  const navigation = useNavigation();

  const onRegister = async (email: string, password: string) => {
    setLoading(true);
    const res = await UserStore.register(email, password);
    setLoading(false);
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
          <TextContainer color={colorScheme.theme}>OR</TextContainer>
        </View>
        <View style={styles.buttonContainer}>
          <BaseButton
            iconSource={imageSource.google}
            iconStyle={styleProvider.buttonIcon}
            style={styles.googleButton}
            label={REGISTER_CONTENT.google}
            onPress={handleGoogleLogin}
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
            <TouchableOpacity
              onPress={() => navigation.navigate(screenName.login as never)}
            >
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
