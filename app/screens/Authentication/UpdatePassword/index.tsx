import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import {
  BaseButton,
  CustomTextField,
  CustomToast,
  PlatformView,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { AccountStore } from 'shared/stores';
import { UpdatePasswordBody } from 'shared/stores/types';
import { colorScheme, styleProvider } from 'shared/styles';
import * as Yup from 'yup';
import YupPassword from 'yup-password';
YupPassword(Yup);

const FORM_ERRORS = APP_CONTENT.formErrors;
const CONTENT = APP_CONTENT.updatePasswordScreen;

const ValidatorSchema = Yup.object({
  newPassword: Yup.string()
    .required(FORM_ERRORS.requiredFiled)
    .min(8, FORM_ERRORS.password)
    .max(32, FORM_ERRORS.password)
    .minNumbers(1, FORM_ERRORS.password)
    .minLowercase(1, FORM_ERRORS.password)
    .minUppercase(1, FORM_ERRORS.password),
  oldPassword: Yup.string()
    .required(FORM_ERRORS.requiredFiled)
    .min(8, FORM_ERRORS.password)
    .max(32, FORM_ERRORS.password)
    .minNumbers(1, FORM_ERRORS.password)
    .minLowercase(1, FORM_ERRORS.password)
    .minUppercase(1, FORM_ERRORS.password),
});

export const UpdatePassword = observer(() => {
  const { updatePassword, response } = AccountStore;
  const handleSubmit = (data: UpdatePasswordBody) => {
    updatePassword(data);
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <View style={styleProvider.container}>
        <Formik
          validationSchema={ValidatorSchema}
          initialValues={{ newPassword: '', oldPassword: '' }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ errors, touched, handleBlur, handleChange, handleSubmit }) => (
            <>
              <CustomTextField
                onBlur={handleBlur('newPassword')}
                secureText
                onChangeText={handleChange('newPassword')}
                placeholder={CONTENT.newPassword}
                errorMessage={touched.newPassword ? errors.newPassword : ''}
              />
              <CustomTextField
                secureText
                onBlur={handleBlur('oldPassword')}
                onChangeText={handleChange('oldPassword')}
                placeholder={CONTENT.oldPassword}
                errorMessage={touched.oldPassword ? errors.oldPassword : ''}
              />
              <BaseButton
                backgroundColor={colorScheme.theme}
                onPress={handleSubmit}
                label={CONTENT.update}
                style={{ marginTop: 30 }}
              />
            </>
          )}
        </Formik>
      </View>
      <TransparentLoading show={response.pending} />
      <CustomToast
        variant="error"
        show={response.isError}
        message={response.errorMessage}
        onDismiss={response.deleteError}
      />
      <CustomToast
        show={response.isSuccess}
        message={CONTENT.success}
        onDismiss={response.deleteSuccess}
      />
    </PlatformView>
  );
});
