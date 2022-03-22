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
const FORM_CONTENT = SCREEN_CONTENT.realEstateModal;
const Component = ({ onSubmit, onClose }: IProps) => {
  return (
    <Formik
      validationSchema={CreateAssetSchema}
      initialValues={{
        name: '',
        inputDay: new Date().toISOString(),
        inputMoneyAmount: 0,
        inputCurrency: '',
        buyPrice: 0,
        currentPrice: 0,
        description: '',
      }}
      onSubmit={(values) => {
        values.buyPrice = 1 * values.buyPrice;
        values.currentPrice = 1 * values.currentPrice;
        values.inputMoneyAmount = values.buyPrice;
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
              title={SCREEN_CONTENT.assetPicker.realEstate}
            />
            <View style={styles.formContainer}>
              <CustomTextField
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                errorMessage={touched.name ? errors.name : ''}
                placeholder={FORM_CONTENT.name}
              />
              <CustomTextField
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                placeholder={FORM_CONTENT.description}
              />
              <CustomTextField
                onChangeText={handleChange('currentPrice')}
                onBlur={handleBlur('currentPrice')}
                errorMessage={touched.currentPrice ? errors.currentPrice : ''}
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.currentPrice}
              />
              <CustomTextField
                onChangeText={handleChange('buyPrice')}
                onBlur={handleBlur('buyPrice')}
                errorMessage={touched.buyPrice ? errors.buyPrice : ''}
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.buyPrice}
              />
              <CurrencyPicker
                errorMessage={touched.inputCurrency ? errors.inputCurrency : ''}
                onChange={handleChange('inputCurrency')}
                renderPicker={renderPickerForPortfolio}
              />
              <DatePicker
                label={FORM_CONTENT.startDate}
                onISOStringChange={handleChange('inputDay')}
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
