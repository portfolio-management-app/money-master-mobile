import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { NavigationHeader } from 'navigation/header';
import { BaseButton, CustomTextField, PlatformView } from 'shared/components';
import { colorScheme, dimensionProvider, styleProvider } from 'shared/styles';
import { imageSource } from 'assets/images';
import { Formik } from 'formik';
import { AuthenticationSchema } from '../validator';
import { APP_CONTENT } from 'shared/constants';

const FORGET_PASSWORD_CONTENT = APP_CONTENT.forgetPasswordPage;

export const ForgetPassword = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={FORGET_PASSWORD_CONTENT.header} />
      <View style={styles.container}>
        <Image style={styles.image} source={imageSource.forgetPassword}></Image>
        <Formik
          validationSchema={AuthenticationSchema}
          initialValues={{ email: '' }}
          onSubmit={(values) => console.log(values)}
        >
          {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <>
              <CustomTextField
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                placeholder={'Email'}
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
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  image: {
    width: dimensionProvider.width,
    height: dimensionProvider.width,
  },
  sendButton: {
    borderColor: colorScheme.theme,
    backgroundColor: colorScheme.theme,
  },
});
