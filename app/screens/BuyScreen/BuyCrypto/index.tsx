import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView } from 'react-native';
import { View } from 'react-native-ui-lib';
import {
  CreateModalHeader,
  CurrencyPicker,
  CustomTextField,
  CustomToast,
  DatePicker,
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import {
  CoinDetailStore,
  PortfolioDetailStore,
  SourceBuyStore,
} from 'shared/stores';
import { CreateCryptoAssetBody } from 'shared/stores/types';
import { styleProvider } from 'shared/styles';
import { CreateCryptoAssetSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.buyScreen;

export const BuyCrypto = observer(() => {
  const navigation = useNavigation();
  const { coinInfo, currency } = CoinDetailStore;
  const { loadingCreateCrypto, createCryptoAsset, createResponse } =
    PortfolioDetailStore;

  const handleCreate = React.useCallback(
    (values: CreateCryptoAssetBody) => {
      createCryptoAsset(values);
    },
    [createCryptoAsset]
  );

  return (
    <PlatformView style={styleProvider.body}>
      <TransparentLoading show={loadingCreateCrypto} />
      <Formik
        validationSchema={CreateCryptoAssetSchema}
        onSubmit={(values) => {
          values.purchasePrice = 1 * values.purchasePrice;
          values.currentAmountHolding = 1 * values.currentAmountHolding;
          values.fee = 1 * values.fee;
          values.tax = 1 * values.tax;
          handleCreate(values);
        }}
        initialValues={{
          name: coinInfo.name,
          inputDay: new Date().toISOString(),
          currentAmountHolding: 0,
          description: '',
          purchasePrice: 0,
          currencyCode: currency,
          cryptoCoinCode: coinInfo.id,
          isUsingInvestFund: SourceBuyStore.usingFund,
          isUsingCash: SourceBuyStore.usingCash,
          usingCashId: SourceBuyStore.cashId,
          fee: 0,
          tax: 0,
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
          const renderCurrentPrice = formatCurrency(
            coinInfo.currentPrice.get(values.currencyCode.toLowerCase()) || 0,
            values.currencyCode
          );
          return (
            <>
              <CreateModalHeader
                title={coinInfo.name}
                onClose={() => navigation.goBack()}
                onCreate={handleSubmit}
                buttonLabel={APP_CONTENT.createAssetType.create}
              />
              <ScrollView>
                <View style={styleProvider.formBody}>
                  <View style={styleProvider.centerHorizontal}>
                    <TextContainer mb={20} bold>
                      {CONTENT.currencyPrice}:{' '}
                    </TextContainer>
                    <TextContainer mb={20}>{renderCurrentPrice}</TextContainer>
                  </View>

                  <CustomTextField
                    onBlur={handleBlur('name')}
                    value={values.name}
                    onChangeText={handleChange('name')}
                    placeholder={CONTENT.name}
                    errorMessage={touched.name ? errors.name : ''}
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
                    onBlur={handleBlur('description')}
                    value={values.description}
                    onChangeText={handleChange('description')}
                    placeholder={CONTENT.description}
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
                    onChange={handleChange('currencyCode')}
                    initVal={currency.toUpperCase()}
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
