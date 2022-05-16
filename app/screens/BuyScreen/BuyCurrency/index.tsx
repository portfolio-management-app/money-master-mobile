import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import {
  BaseButton,
  CustomTextField,
  CustomToast,
  DatePicker,
  InvestFundBuy,
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CurrencyDetailStore, PortfolioDetailStore } from 'shared/stores';
import { CreateCurrencyAssetBody } from 'shared/stores/types';
import { styleProvider, colorScheme } from 'shared/styles';
import { CreateCurrencyAssetSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.buyScreen;

export const BuyCurrency = observer(() => {
  const [buyFromFund, setBuyFromFund] = React.useState(false);
  const { currencyInformation } = CurrencyDetailStore;
  const { createCurrencyAsset, loadingCreateCurrencyAsset, createResponse } =
    PortfolioDetailStore;
  const tokens = currencyInformation.s.split('/');

  const onCreate = React.useCallback(
    (values: CreateCurrencyAssetBody) => {
      createCurrencyAsset(values);
    },
    [createCurrencyAsset]
  );
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={currencyInformation.s} />
      <TransparentLoading show={loadingCreateCurrencyAsset} />
      <Formik
        validationSchema={CreateCurrencyAssetSchema}
        onSubmit={(values) => {
          values.isUsingInvestFund = buyFromFund;
          onCreate(values);
        }}
        initialValues={{
          currencyCode: currencyInformation.s.split('/')[0],
          amount: 0,
          name: '',
          inputDay: new Date().toISOString(),
          description: '',
          isUsingInvestFund: false,
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          touched,
          errors,
        }) => {
          console.log(errors);
          return (
            <View style={styleProvider.formBody}>
              <View style={styleProvider.centerHorizontal}>
                <TextContainer mb={20} bold>
                  {CONTENT.currencyPrice}:{' '}
                </TextContainer>
                <TextContainer mb={20}>
                  {formatCurrency(parseFloat(currencyInformation.c), tokens[1])}
                </TextContainer>
              </View>
              <CustomTextField
                onBlur={handleBlur('name')}
                value={values.name}
                onChangeText={handleChange('name')}
                placeholder={CONTENT.name}
                errorMessage={touched.name ? errors.name : ''}
              />
              <CustomTextField
                onBlur={handleBlur('amount')}
                value={values.amount.toString()}
                onChangeText={handleChange('amount')}
                placeholder={CONTENT.amount}
                errorMessage={touched.amount ? errors.amount : ''}
              />
              <CustomTextField
                onBlur={handleBlur('description')}
                value={values.description}
                onChangeText={handleChange('description')}
                placeholder={CONTENT.description}
              />
              <InvestFundBuy
                buy={buyFromFund}
                onToggle={() => setBuyFromFund(!buyFromFund)}
              />
              <DatePicker
                onISOStringChange={handleChange('inputDay')}
                label={CONTENT.startDate}
              />
              <BaseButton
                onPress={handleSubmit}
                label={CONTENT.buy}
                backgroundColor={colorScheme.theme}
              />
            </View>
          );
        }}
      </Formik>
      <CustomToast
        variant="error"
        show={createResponse.isError}
        onDismiss={createResponse.deleteError}
        message={createResponse.errorMessage}
      />
      <CustomToast
        onDismiss={createResponse.deleteSuccess}
        show={createResponse.isSuccess}
        message={APP_CONTENT.transferToFund.success}
      />
    </PlatformView>
  );
});
