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
import { PortfolioDetailStore, StockDetailStore } from 'shared/stores';
import { CreateStockAssetBody } from 'shared/stores/types';
import { styleProvider, colorScheme } from 'shared/styles';
import { CreateStockAssetSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';
const CONTENT = APP_CONTENT.buyScreen;

export const BuyStock = observer(() => {
  const [buyFromFund, setBuyFromFund] = React.useState(false);
  const { stockInformation, symbol } = StockDetailStore;
  const { createStockAsset, loadingCreateStockAsset, createResponse } =
    PortfolioDetailStore;

  const handleCreate = React.useCallback(
    (values: CreateStockAssetBody) => {
      createStockAsset(values);
    },
    [createStockAsset]
  );

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={symbol} />
      <TransparentLoading show={loadingCreateStockAsset} />

      <Formik
        validationSchema={CreateStockAssetSchema}
        onSubmit={(values) => {
          values.isUsingInvestFund = buyFromFund;
          handleCreate(values);
        }}
        initialValues={{
          name: '',
          inputDay: new Date().toISOString(),
          description: '',
          currentAmountHolding: 0,
          stockCode: symbol,
          marketCode: '',
          purchasePrice: 0,
          currencyCode: 'USD',
          isUsingInvestFund: false,
        }}
      >
        {({
          handleChange,
          handleSubmit,
          handleBlur,
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
                  {formatCurrency(stockInformation.c, values.currencyCode)}
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
                onBlur={handleBlur('description')}
                value={values.description}
                onChangeText={handleChange('description')}
                placeholder={CONTENT.description}
              />

              <CustomTextField
                onBlur={handleBlur('currentAmountHolding')}
                value={values.currentAmountHolding.toString()}
                onChangeText={handleChange('currentAmountHolding')}
                placeholder={CONTENT.amount}
                errorMessage={
                  touched.currentAmountHolding
                    ? errors.currentAmountHolding
                    : ''
                }
              />
              <CustomTextField
                onBlur={handleBlur('purchasePrice')}
                value={values.purchasePrice.toString()}
                onChangeText={handleChange('purchasePrice')}
                placeholder={CONTENT.purchasePrice}
                errorMessage={touched.purchasePrice ? errors.purchasePrice : ''}
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
