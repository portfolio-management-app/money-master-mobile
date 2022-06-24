import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
  DatePicker,
  renderPickerForPortfolio,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { SourceBuyStore } from 'shared/stores';
import { CreateOtherAssetBody } from 'shared/stores/types';
import { CreateAssetSchema } from './validator';

interface IProps {
  onSubmit: (data: CreateOtherAssetBody) => void;
  onClose: () => void;
  header?: string;
}
const FORM_CONTENT = APP_CONTENT.portfolioDetail.createOtherModal;

export const CreateForm = observer(({ onSubmit, onClose, header }: IProps) => {
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
        isUsingInvestFund: SourceBuyStore.usingFund,
        isUsingCash: SourceBuyStore.usingCash,
        usingCashId: SourceBuyStore.cashId,
        fee: 0,
        tax: 0,
      }}
      onSubmit={(values) => {
        values.fee = 1 * values.fee;
        values.tax = 1 * values.tax;
        values.inputMoneyAmount = 1 * values.inputMoneyAmount;
        values.interestRate = (1 * values.interestRate) / 100;
        values.termRange = 1 * values.termRange;
        onSubmit(values);
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
              <CustomTextField
                onChangeText={handleChange('fee')}
                onBlur={handleBlur('fee')}
                keyBoardType="decimal-pad"
                placeholder={`${APP_CONTENT.fee} (%)`}
                value={values.fee.toString()}
                errorMessage={touched.fee ? errors.fee : ''}
              />
              <CustomTextField
                onChangeText={handleChange('tax')}
                onBlur={handleBlur('tax')}
                keyBoardType="decimal-pad"
                placeholder={`${APP_CONTENT.tax} (%)`}
                value={values.tax.toString()}
                errorMessage={touched.tax ? errors.tax : ''}
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
});

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
