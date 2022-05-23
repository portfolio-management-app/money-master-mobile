import { Formik } from 'formik';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  CustomTextField,
  CurrencyPicker,
  renderPickerForPortfolio,
  CreateModalHeader,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IPortfolio } from 'shared/models';
import { EditPortfolioBody } from 'shared/stores/types';
import { colorScheme } from 'shared/styles';
import { EditPortfolioSchema } from './validator';

interface IProps {
  onEdit: (body: EditPortfolioBody) => void;
  portfolio: IPortfolio;
  onClose: () => void;
}
export const Form = ({ onEdit, portfolio, onClose }: IProps) => {
  return (
    <Formik
      validationSchema={EditPortfolioSchema}
      initialValues={{
        newName: portfolio.name,
        newCurrency: portfolio.initialCurrency,
      }}
      onSubmit={(values) => {
        onEdit(values);
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
              title={APP_CONTENT.editPortfolio.header}
              buttonLabel={APP_CONTENT.editPortfolio.buttonLabel}
              onCreate={handleSubmit}
            />
            <View style={styles.formContainer}>
              <CustomTextField
                onChangeText={handleChange('newName')}
                onBlur={handleBlur('newName')}
                errorMessage={touched.newName ? errors.newName : ''}
                placeholder={APP_CONTENT.portfolioCreateModal.name}
                value={values.newName}
              />

              <CurrencyPicker
                errorMessage={touched.newCurrency ? errors.newCurrency : ''}
                onChange={handleChange('newCurrency')}
                renderPicker={renderPickerForPortfolio}
                initVal={portfolio.initialCurrency}
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
    backgroundColor: colorScheme.white,
    flex: 1,
  },
});
