import { Formik } from 'formik';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
  DatePicker,
  InvestFundBuy,
  renderPickerForPortfolio,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CreateOtherAssetBody } from 'shared/stores/types';
import { CreateAssetSchema } from './validator';

interface IProps {
  onSubmit: (data: CreateOtherAssetBody) => void;
  onClose: () => void;
  header?: string;
}
const FORM_CONTENT = APP_CONTENT.portfolioDetail.createOtherModal;

const Component = ({ onSubmit, onClose, header }: IProps) => {
  const [buyFromFund, setBuyFromFund] = React.useState(false);
  return (
    <Formik
      validationSchema={CreateAssetSchema}
      initialValues={{
        name: '',
        inputDay: new Date().toISOString(),
        inputMoneyAmount: 0,
        inputCurrency: '',
        description: '',
        interestRate: 0,
        termRange: 0,
        isUsingInvestFund: false,
      }}
      onSubmit={(values) => {
        values.inputMoneyAmount = 1 * values.inputMoneyAmount;
        values.interestRate = 1 * values.interestRate;
        values.termRange = 1 * values.termRange;
        values.isUsingInvestFund = buyFromFund;
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
              title={header}
            />
            <ScrollView style={styles.formContainer}>
              <CustomTextField
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                errorMessage={touched.name ? errors.name : ''}
                placeholder={FORM_CONTENT.name}
              />
              <CustomTextField
                onChangeText={handleChange('description')}
                placeholder={FORM_CONTENT.description}
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
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.rate}
              />
              <CustomTextField
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.termRange}
              />
              <InvestFundBuy
                buy={buyFromFund}
                onToggle={() => setBuyFromFund(!buyFromFund)}
              />
              <DatePicker
                onISOStringChange={handleChange('inputDay')}
                label={FORM_CONTENT.startDate}
              />
            </ScrollView>
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
