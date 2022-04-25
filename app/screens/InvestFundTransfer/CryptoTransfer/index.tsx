import { Formik } from 'formik';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import {
  BaseButton,
  CustomTextField,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { TransferToFundAssetSchema } from 'shared/validator';

const CONTENT = APP_CONTENT.transferToFund;

export const CryptoTransfer = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <View>
        <TextContainer></TextContainer>
      </View>
      <Formik
        validationSchema={TransferToFundAssetSchema}
        initialValues={{ amount: 0 }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ errors, touched, handleBlur, handleChange }) => {
          return (
            <>
              <View style={styleProvider.container}>
                <CustomTextField
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  keyBoardType="decimal-pad"
                  errorMessage={touched.amount ? errors.amount : ''}
                  placeholder={CONTENT.amount}
                />
                <BaseButton
                  backgroundColor={colorScheme.theme}
                  label={CONTENT.transfer}
                />
              </View>
            </>
          );
        }}
      </Formik>
    </PlatformView>
  );
};
