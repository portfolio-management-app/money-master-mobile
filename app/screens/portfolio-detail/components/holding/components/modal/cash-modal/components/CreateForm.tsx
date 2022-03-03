import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/portfolio-detail/constants';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
} from 'shared/components';
import { colorScheme } from 'shared/styles';
import { CreateAssetSchema } from './validator';

interface IProps {
  onSubmit: (data: any) => void;
  onClose: () => void;
}
const FORM_CONTENT = SCREEN_CONTENT.createOtherModal;

const Component = ({ onSubmit, onClose }: IProps) => {
  return (
    <Formik
      validationSchema={CreateAssetSchema}
      initialValues={{ name: '', initBalance: 0, currency: '' }}
      onSubmit={(values) => onSubmit(values)}
    >
      {({ errors, touched, handleBlur, handleChange, handleSubmit }) => {
        return (
          <>
            <CreateModalHeader
              onClose={onClose}
              onCreate={handleSubmit}
              buttonLabel={FORM_CONTENT.create}
              title={SCREEN_CONTENT.assetPicker.cash}
              bgColor={colorScheme.theme}
              headerStyle="light-content"
            />
            <View style={styles.formContainer}>
              <CustomTextField
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                errorMessage={touched.name ? errors.name : ''}
                placeholder={FORM_CONTENT.name}
              />
              <CustomTextField
                onChangeText={handleChange('initBalance')}
                onBlur={handleBlur('initBalance')}
                errorMessage={touched.initBalance ? errors.initBalance : ''}
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.balance}
              />
              <CurrencyPicker
                headerStyle="light-content"
                bgColor={colorScheme.theme}
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

export const CreateForm = React.memo(Component);

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
