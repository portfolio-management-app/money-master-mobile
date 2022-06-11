import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { BaseButton, CustomTextField } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { yupParserNumber } from 'utils/string';
import * as Yup from 'yup';

const CONTENT = APP_CONTENT.createTransaction;
const FORM_ERROR = APP_CONTENT.formErrors;

export const AmountSchema = Yup.object().shape({
  amount: Yup.number()
    .transform(yupParserNumber)
    .required(FORM_ERROR.requiredFiled)
    .positive(FORM_ERROR.mustBeANumber),
});

interface IProps {
  onSubmit?: (amount: number) => void;
  buttonContent?: string;
  inputPlaceHolder?: string;
  haveAmountField?: boolean;
  initAmount?: number;
  currency?: string;
}

export const AmountForm = ({
  onSubmit,
  buttonContent = CONTENT.sell,
  inputPlaceHolder = CONTENT.amount,
  haveAmountField = true,
  initAmount = 0,
  currency,
}: IProps) => {
  return (
    <Formik
      validationSchema={AmountSchema}
      initialValues={{ amount: initAmount }}
      onSubmit={(values) => {
        onSubmit && onSubmit(1 * values.amount);
      }}
    >
      {({ errors, touched, handleBlur, handleChange, handleSubmit }) => {
        return (
          <>
            <View style={[styleProvider.container, { marginTop: 20 }]}>
              {haveAmountField && (
                <CustomTextField
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  keyBoardType="decimal-pad"
                  errorMessage={touched.amount ? errors.amount : ''}
                  placeholder={`${inputPlaceHolder} ${
                    currency && `(${currency})`
                  }`}
                />
              )}
              <BaseButton
                onPress={handleSubmit}
                backgroundColor={colorScheme.theme}
                label={buttonContent}
                style={{ marginTop: 20 }}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};
