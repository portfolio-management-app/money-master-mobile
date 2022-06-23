import { Formik } from 'formik';
import React from 'react';
import { View } from 'react-native';
import { BaseButton, CustomTextField } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { SellDataCallBack } from 'shared/types';
import { SellAssetSchema } from 'shared/validator';

const CONTENT = APP_CONTENT.createTransaction;

interface IProps {
  onSell?: (data: SellDataCallBack) => void;
  buttonContent?: string;
  inputPlaceHolder?: string;
  haveAmountField?: boolean;
  initAmount?: number;
  currency?: string;
}

export const SellForm = ({
  onSell,
  buttonContent = CONTENT.sell,
  inputPlaceHolder = CONTENT.amount,
  haveAmountField = true,
  initAmount = 0,
  currency,
}: IProps) => {
  const initValues = React.useMemo(() => {
    return { amount: initAmount, fee: 0, tax: 0 };
  }, [initAmount]);
  return (
    <Formik
      validationSchema={SellAssetSchema}
      initialValues={initValues}
      onSubmit={(values) => {
        onSell &&
          onSell({
            amount: 1 * values.amount,
            fee: 1 * values.fee,
            tax: 1 * values.tax,
          });
      }}
    >
      {({
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        values,
      }) => {
        return (
          <>
            <View style={[styleProvider.container, { marginTop: 20 }]}>
              {haveAmountField && (
                <CustomTextField
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  keyBoardType="decimal-pad"
                  errorMessage={touched.amount ? errors.amount : ''}
                  placeholder={`${inputPlaceHolder}
                  `}
                />
              )}
              <CustomTextField
                onChangeText={handleChange('fee')}
                onBlur={handleBlur('fee')}
                keyBoardType="decimal-pad"
                errorMessage={touched.fee ? errors.fee : ''}
                placeholder={`${CONTENT.fee} ${currency && `(${currency})`}`}
                value={values.fee.toString()}
              />
              <CustomTextField
                onChangeText={handleChange('tax')}
                onBlur={handleBlur('tax')}
                keyBoardType="decimal-pad"
                errorMessage={touched.tax ? errors.tax : ''}
                placeholder={CONTENT.tax}
                value={values.tax.toString()}
              />
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
