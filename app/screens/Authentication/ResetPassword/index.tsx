import { useNavigation, useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { View } from 'react-native';
import {
  BaseButton,
  CustomTextField,
  PlatformView,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { AccountStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const FORM_ERRORS = APP_CONTENT.formErrors;
const CONTENT = APP_CONTENT.resetPassword;

const ValidatorSchema = Yup.object({
  password: Yup.string()
    .required(FORM_ERRORS.requiredFiled)
    .min(8, FORM_ERRORS.password)
    .max(32, FORM_ERRORS.password)
    .minNumbers(1, FORM_ERRORS.password)
    .minLowercase(1, FORM_ERRORS.password)
    .minUppercase(1, FORM_ERRORS.password),
  retypePassword: Yup.string()
    .required(FORM_ERRORS.requiredFiled)
    .min(8, FORM_ERRORS.password)
    .max(32, FORM_ERRORS.password)
    .minNumbers(1, FORM_ERRORS.password)
    .minLowercase(1, FORM_ERRORS.password)
    .minUppercase(1, FORM_ERRORS.password)
    .oneOf([Yup.ref('password')], FORM_ERRORS.retypePassword),
});

export const ResetPassword = observer(() => {
  const routeProps = useRoute<RootStackScreenProps<'ResetPassword'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const { resetPassword, response } = AccountStore;
  const handleSubmit = async (newPassword: string) => {
    const result = await resetPassword({
      email: routeProps.params.email,
      newPassword: newPassword,
    });
    if (result) {
      navigation.navigate('Login');
    }
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.resetHeader} />
      <View style={styleProvider.container}>
        <Formik
          validationSchema={ValidatorSchema}
          initialValues={{ password: '', retypePassword: '' }}
          onSubmit={(values) => {
            handleSubmit(values.password);
          }}
        >
          {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <>
              <CustomTextField
                onBlur={handleBlur('password')}
                onChangeText={handleChange('password')}
                placeholder={CONTENT.password}
                secureText
                errorMessage={touched.password ? errors.password : ''}
              />
              <CustomTextField
                onBlur={handleBlur('retypePassword')}
                onChangeText={handleChange('retypePassword')}
                placeholder={CONTENT.retypePass}
                secureText
                errorMessage={
                  touched.retypePassword ? errors.retypePassword : ''
                }
              />
              <BaseButton
                backgroundColor={colorScheme.theme}
                onPress={handleSubmit}
                label={CONTENT.reset}
                style={{ marginTop: 30 }}
              />
            </>
          )}
        </Formik>
      </View>
      <TransparentLoading show={response.pending} />
    </PlatformView>
  );
});
