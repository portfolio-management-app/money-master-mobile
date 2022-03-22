import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
  DatePicker,
  renderPickerForPortfolio,
} from 'shared/components';
import { CreateAssetSchema } from './validator';

interface IProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}
const FORM_CONTENT = SCREEN_CONTENT.createOtherModal;

const Component = ({ onSubmit, onClose }: IProps) => {
  const [date, setDate] = React.useState(new Date());
  return (
    <Formik
      validationSchema={CreateAssetSchema}
      initialValues={{
        name: '',
        bankCode: '',
        inputDay: new Date().toISOString(),
        inputCurrency: '',
        inputMoneyAmount: 0,
        isGoingToReinState: true,
        description: '',
        interestRate: 0,
        termRange: 0,
      }}
      onSubmit={(values) => {
        values.inputDay = date.toISOString();
        values.inputMoneyAmount = 1 * values.inputMoneyAmount;
        values.interestRate = 1 * values.interestRate;
        values.termRange = 1 * values.termRange;
        onSubmit(values);
        onClose();
      }}
    >
      {({ errors, touched, handleBlur, handleChange, handleSubmit }) => {
        return (
          <>
            <CreateModalHeader
              onClose={onClose}
              onCreate={handleSubmit}
              buttonLabel={FORM_CONTENT.create}
              title={SCREEN_CONTENT.assetPicker.banking}
            />
            <View style={styles.formContainer}>
              <CustomTextField
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                errorMessage={touched.name ? errors.name : ''}
                placeholder={SCREEN_CONTENT.bankingModal.name}
              />
              <CustomTextField
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                placeholder={SCREEN_CONTENT.bankingModal.description}
              />
              <CustomTextField
                onChangeText={handleChange('inputMoneyAmount')}
                onBlur={handleBlur('inputMoneyAmount')}
                errorMessage={
                  touched.inputMoneyAmount ? errors.inputMoneyAmount : ''
                }
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.balance}
              />
              <CurrencyPicker
                errorMessage={touched.inputCurrency ? errors.inputCurrency : ''}
                onChange={handleChange('inputCurrency')}
                renderPicker={renderPickerForPortfolio}
              />
              <CustomTextField
                onChangeText={handleChange('interestRate')}
                onBlur={handleBlur('interestRate')}
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.rate}
                errorMessage={touched.interestRate ? errors.interestRate : ''}
              />
              <CustomTextField
                onChangeText={handleChange('termRange')}
                onBlur={handleBlur('termRange')}
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.termRange}
                errorMessage={touched.termRange ? errors.termRange : ''}
              />
              <DatePicker onChange={setDate} label={FORM_CONTENT.startDate} />
            </View>
          </>
        );
      }}
    </Formik>
  );
};

export const CreateForm = React.memo(Component);

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
