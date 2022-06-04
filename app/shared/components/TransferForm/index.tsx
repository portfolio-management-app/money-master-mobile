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
  buttonContent?: string;
  inputPlaceHolder?: string;
}

export const TransferForm = ({
  onTransfer,
  buttonContent = CONTENT.transfer,
  inputPlaceHolder = CONTENT.amount,
}: IProps) => {
  return (
    <Formik
      validationSchema={TransferToFundAssetSchema}
      initialValues={{ amount: 0 }}
      onSubmit={(values) => {
        onTransfer && onTransfer(1 * values.amount);
      }}
    >
      {({ errors, touched, handleBlur, handleChange, handleSubmit }) => {
        return (
          <>
            <View style={[styleProvider.container, { marginTop: 20 }]}>
              <CustomTextField
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                keyBoardType="decimal-pad"
                errorMessage={touched.amount ? errors.amount : ''}
                placeholder={inputPlaceHolder}
              />
              <BaseButton
                onPress={handleSubmit}
                backgroundColor={colorScheme.theme}
                label={buttonContent}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};
