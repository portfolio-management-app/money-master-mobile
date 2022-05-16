import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native-ui-lib';
import {
  BaseButton,
  CurrencyPicker,
  CustomTextField,
  CustomToast,
  DatePicker,
  InvestFundBuy,
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CoinDetailStore, PortfolioDetailStore } from 'shared/stores';
import { CreateCryptoAssetBody } from 'shared/stores/types';
import { colorScheme, styleProvider } from 'shared/styles';
import { CreateCryptoAssetSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.buyScreen;

export const BuyCrypto = observer(() => {
  const [buyFromFund, setBuyFromFund] = React.useState(false);
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
      <NavigationHeader title={coinInfo.name} />
      <TransparentLoading show={loadingCreateCrypto} />

      <Formik
        validationSchema={CreateCryptoAssetSchema}
        onSubmit={(values) => {
          values.purchasePrice = 1 * values.purchasePrice;
          values.currentAmountHolding = 1 * values.currentAmountHolding;
          values.isUsingInvestFund = buyFromFund;
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
          isUsingInvestFund: buyFromFund,
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
                errorMessage={touched.purchasePrice ? errors.purchasePrice : ''}
              />
              <CustomTextField
                onBlur={handleBlur('description')}
                value={values.description}
                onChangeText={handleChange('description')}
                placeholder={CONTENT.description}
              />
              <CurrencyPicker
                onChange={handleChange('currencyCode')}
                initVal={currency.toUpperCase()}
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
                style={{ marginTop: 20 }}
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
