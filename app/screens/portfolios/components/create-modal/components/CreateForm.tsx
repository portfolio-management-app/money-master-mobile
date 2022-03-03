import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
} from 'shared/components';
import { SCREEN_CONTENT } from '../index';
import { CreatePortfolioSchema } from '../validator';

interface IProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export const CreateForm = ({ onSubmit, onClose }: IProps) => {
  return (
    <Formik
      validationSchema={CreatePortfolioSchema}
      initialValues={{ name: '', initBalance: 0, currency: '' }}
      onSubmit={(values) => onSubmit(values)}
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
                keyBoardType="decimal-pad"
                placeholder={SCREEN_CONTENT.balance}
              />
              <CurrencyPicker
                errorMessage={touched.currency ? errors.currency : ''}
                onChange={handleChange('currency')}
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
