import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
  renderPickerForPortfolio,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CreatePortfolioBody } from 'shared/stores/types';
import { SCREEN_CONTENT } from '../index';
import { CreatePortfolioSchema } from '../validator';

interface IProps {
  onSubmit: (data: CreatePortfolioBody) => void;
  onClose: () => void;
}

export const CreateForm = ({ onSubmit, onClose }: IProps) => {
  return (
    <Formik
      validationSchema={CreatePortfolioSchema}
      initialValues={{ name: '', initBalance: 0, currency: '' }}
      onSubmit={(values) => {
        const data: CreatePortfolioBody = {
          initialCash: values.initBalance,
          name: values.name,
          initialCurrency: values.currency,
          initialCashDescription:
            APP_CONTENT.portfolioCreateModal.initCashDescription,
          initialCashName: values.currency,
        };
        onSubmit(data);
      }}
    >
      {({ errors, touched, handleBlur, handleChange, handleSubmit }) => {
        return (
          <>
            <CreateModalHeader
              onClose={onClose}
              onCreate={handleSubmit}
              buttonLabel={SCREEN_CONTENT.create}
              title={SCREEN_CONTENT.header}
            />
            <View style={styles.formContainer}>
              <CustomTextField
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                errorMessage={touched.name ? errors.name : ''}
                placeholder={SCREEN_CONTENT.name}
              />
              <CustomTextField
                onChangeText={handleChange('initBalance')}
                onBlur={handleBlur('initBalance')}
                errorMessage={touched.initBalance ? errors.initBalance : ''}
                placeholder={SCREEN_CONTENT.balance}
              />
              <CurrencyPicker
                errorMessage={touched.currency ? errors.currency : ''}
                onChange={handleChange('currency')}
                renderPicker={renderPickerForPortfolio}
              />
            </View>
          </>
        );
      }}
    </Formik>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
  },
});
