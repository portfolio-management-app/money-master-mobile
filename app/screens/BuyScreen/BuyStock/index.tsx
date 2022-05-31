import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  CreateModalHeader,
  CustomTextField,
  CustomToast,
  DatePicker,
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import {
  PortfolioDetailStore,
  SourceBuyStore,
  StockDetailStore,
} from 'shared/stores';
import { CreateStockAssetBody } from 'shared/stores/types';
import { styleProvider } from 'shared/styles';
import { CreateStockAssetSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';
const CONTENT = APP_CONTENT.buyScreen;

export const BuyStock = observer(() => {
  const navigation = useNavigation();
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
      <TransparentLoading show={loadingCreateStockAsset} />
      <Formik
        validationSchema={CreateStockAssetSchema}
        onSubmit={(values) => {
          values.fee = 1 * values.fee;
          values.tax = 1 * values.tax;
          values.currentAmountHolding = 1 * values.currentAmountHolding;
          values.purchasePrice = 1 * values.currentAmountHolding;
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
          isUsingInvestFund: SourceBuyStore.usingFund,
          isUsingCash: SourceBuyStore.usingCash,
          usingCashId: SourceBuyStore.cashId,
          fee: 0,
          tax: 0,
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
          return (
            <>
              <CreateModalHeader
                title={symbol}
                buttonLabel={APP_CONTENT.createAssetType.create}
                onClose={() => navigation.goBack()}
                onCreate={handleSubmit}
              />
              <ScrollView>
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
                    errorMessage={
                      touched.purchasePrice ? errors.purchasePrice : ''
                    }
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
                    label={CONTENT.startDate}
                  />
                </View>
              </ScrollView>
            </>
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
        message={APP_CONTENT.buyScreen.createSuccess}
      />
    </PlatformView>
  );
});
