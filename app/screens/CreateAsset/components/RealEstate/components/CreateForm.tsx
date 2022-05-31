import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
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
import { APP_CONTENT } from 'shared/constants';
import { SourceBuyStore } from 'shared/stores';
import { CreateRealEstateAssetBody } from 'shared/stores/types';
import { CreateAssetSchema } from './validator';

interface IProps {
  onSubmit: (data: CreateRealEstateAssetBody) => void;
  onClose: () => void;
}
const FORM_CONTENT = SCREEN_CONTENT.realEstateModal;
export const CreateForm = observer(({ onSubmit, onClose }: IProps) => {
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
        isUsingInvestFund: SourceBuyStore.usingFund,
        isUsingCash: SourceBuyStore.usingCash,
        usingCashId: SourceBuyStore.cashId,
        fee: 0,
        tax: 0,
      }}
      onSubmit={(values) => {
        values.inputMoneyAmount = 1 * values.inputMoneyAmount;
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
                onChangeText={handleChange('inputMoneyAmount')}
                onBlur={handleBlur('inputMoneyAmount')}
                errorMessage={
                  touched.inputMoneyAmount ? errors.inputMoneyAmount : ''
                }
                keyBoardType="decimal-pad"
                placeholder={FORM_CONTENT.buyPrice}
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
});

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
});
