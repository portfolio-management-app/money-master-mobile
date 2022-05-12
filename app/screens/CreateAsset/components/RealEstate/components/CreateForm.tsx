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
  InvestFundBuy,
  renderPickerForPortfolio,
} from 'shared/components';
import { CreateRealEstateAssetBody } from 'shared/stores/types';
import { CreateAssetSchema } from './validator';

interface IProps {
  onSubmit: (data: CreateRealEstateAssetBody) => void;
  onClose: () => void;
}
const FORM_CONTENT = SCREEN_CONTENT.realEstateModal;
const Component = ({ onSubmit, onClose }: IProps) => {
  const [buyFromFund, setBuyFromFund] = React.useState(false);
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
        isUsingInvestFund: false,
      }}
      onSubmit={(values) => {
        values.buyPrice = 1 * values.buyPrice;
        values.currentPrice = 1 * values.currentPrice;
        values.inputMoneyAmount = values.buyPrice;
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
              <InvestFundBuy
                buy={buyFromFund}
                onToggle={() => setBuyFromFund(!buyFromFund)}
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
