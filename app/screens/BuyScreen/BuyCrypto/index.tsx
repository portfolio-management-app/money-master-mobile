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
  PlatformView,
  TextContainer,
  TransparentLoading,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CoinDetailStore, PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { CreateCryptoAssetSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.buyScreen;

export const BuyCrypto = observer(() => {
  const [success, setSuccess] = React.useState(false);
  const { coinInfo, currency } = CoinDetailStore;
  const { loadingCreateCrypto, createCryptoAsset } = PortfolioDetailStore;

  const handleCreate = React.useCallback(
    async (values: any) => {
      const isSuccess = await createCryptoAsset(values);
      if (isSuccess) {
        setSuccess(true);
      }
    },
    [createCryptoAsset]
  );

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={coinInfo.name} />
      <TransparentLoading show={loadingCreateCrypto} />
      <CustomToast
        variant="success"
        message={CONTENT.createSuccess}
        show={success}
        onDismiss={() => setSuccess(false)}
      />
      <Formik
        validationSchema={CreateCryptoAssetSchema}
        onSubmit={(values) => {
          values.purchasePrice = 1 * values.purchasePrice;
          values.currentAmountHolding = 1 * values.currentAmountHolding;
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
    </PlatformView>
  );
});
