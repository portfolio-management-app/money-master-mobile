import { Formik } from 'formik';
import React from 'react';
import { Dialog, View } from 'react-native-ui-lib';
import { BaseButton, CustomTextField } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { yupParserNumber } from 'utils/string';
import * as Yup from 'yup';

const CONTENT = APP_CONTENT.assetNotificationSetting;
const ERROR = APP_CONTENT.formErrors;
const ValidateSchema = Yup.object().shape({
  amount: Yup.number()
    .transform(yupParserNumber)
    .required(ERROR.requiredFiled)
    .positive(ERROR.mustBeANumber),
});

interface IProps {
  show: boolean;
  onClose: () => void;
  initAmount: number;
  onSubmit: (amount: number) => void;
}

export const PriceLowInputModal = ({
  show,
  onClose,
  onSubmit,
  initAmount,
}: IProps) => {
  return (
    <Dialog visible={show} onDismiss={onClose}>
      <View
        backgroundColor={colorScheme.white}
        style={{ paddingHorizontal: 30, borderRadius: 10, paddingVertical: 30 }}
      >
        <Formik
          validationSchema={ValidateSchema}
          onSubmit={(values) => {
            onSubmit(1 * values.amount);
            onClose();
          }}
          initialValues={{ amount: initAmount }}
        >
          {({ handleChange, handleBlur, handleSubmit, values }) => {
            return (
              <>
                <CustomTextField
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  placeholder={CONTENT.amountPlaceHolder}
                  value={values.amount.toString()}
                />
                <BaseButton
                  backgroundColor={colorScheme.theme}
                  label={CONTENT.save}
                  onPress={handleSubmit}
                />
              </>
            );
          }}
        </Formik>
      </View>
    </Dialog>
  );
};
