import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { BaseButton, CustomTextField } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { TransferToFundAssetSchema } from 'shared/validator';

const CONTENT = APP_CONTENT.transferToFund;

interface IProps {
  onTransfer?: (amount: number) => void;
}

export const TransferForm = ({ onTransfer }: IProps) => {
  return (
    <Formik
      validationSchema={TransferToFundAssetSchema}
      initialValues={{ amount: 0 }}
      onSubmit={(values) => {
        onTransfer && onTransfer(values.amount);
      }}
    >
      {({ errors, touched, handleBlur, handleChange, handleSubmit }) => {
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
                onPress={handleSubmit}
                backgroundColor={colorScheme.theme}
                label={CONTENT.transfer}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};
