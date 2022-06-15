import React from 'react';
import { Image, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { NavigationHeader } from 'navigation/header';
import {
  BaseButton,
  CustomTextField,
  CustomToast,
  PlatformView,
  TransparentLoading,
} from 'shared/components';
import { colorScheme, dimensionProvider, styleProvider } from 'shared/styles';
import { imageSource } from 'assets/images';
import { Formik } from 'formik';
import { APP_CONTENT } from 'shared/constants';
import { observer } from 'mobx-react-lite';
import { AccountStore } from 'shared/stores';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import { localeKey } from 'services/storage';

import * as Yup from 'yup';

const FORM_ERROR = APP_CONTENT.formErrors;

export const ValidatorSchema = Yup.object().shape({
  email: Yup.string()
    .email(FORM_ERROR.email)
    .required(FORM_ERROR.requiredFiled),
});

const FORGET_PASSWORD_CONTENT = APP_CONTENT.forgetPasswordPage;

export const ForgetPassword = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const { requestForgetPassword, response } = AccountStore;

  const handleSubmit = async (email: string) => {
    const result = await requestForgetPassword({
      email: email,
      lang: localeKey,
    });
    if (result) {
      navigation.navigate('OTPVerify', { email: email });
    }
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={FORGET_PASSWORD_CONTENT.header} />
      <Image style={styles.image} source={imageSource.forgetPassword}></Image>
      <View style={styles.container}>
        <Formik
          validationSchema={ValidatorSchema}
          initialValues={{ email: '' }}
          onSubmit={(values) => {
            handleSubmit(values.email);
          }}
        >
          {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <>
              <CustomTextField
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                placeholder={APP_CONTENT.resetPassword.yourAccountEmail}
                errorMessage={touched.email ? errors.email : ''}
              />
              <BaseButton
                onPress={handleSubmit}
                style={styles.sendButton}
                label={FORGET_PASSWORD_CONTENT.send}
              />
            </>
          )}
        </Formik>
      </View>
      <TransparentLoading show={response.pending} />
      <CustomToast
        variant="error"
        message={response.errorMessage}
        show={response.isError}
        onDismiss={response.deleteError}
      />
    </PlatformView>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  image: {
    width: dimensionProvider.width,
    height: dimensionProvider.height - dimensionProvider.width - 200,
  },
  sendButton: {
    borderColor: colorScheme.theme,
    backgroundColor: colorScheme.theme,
    marginTop: 30,
  },
});
