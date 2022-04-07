import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native-ui-lib';
import {
  BaseButton,
  CurrencyPicker,
  CustomTextField,
  DatePicker,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { CoinDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { PriceSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.buyScreen;

export const BuyCrypto = observer(() => {
  const { coinInfo, currency } = CoinDetailStore;

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={coinInfo.name} />
      <Formik
        validationSchema={PriceSchema}
        onSubmit={(values) => console.log(values)}
        initialValues={{
          currency: currency,
          amount: 0,
          description: '',
          purchasePrice: 0,
          name: '',
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
            coinInfo.currentPrice.get(values.currency.toLowerCase()) || 0,
            values.currency
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
                onBlur={handleBlur('amount')}
                value={values.amount.toString()}
                onChangeText={handleChange('amount')}
                placeholder={CONTENT.amount}
                errorMessage={touched.amount ? errors.amount : ''}
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
                onChange={handleChange('currency')}
                initVal={currency.toUpperCase()}
              />
              <DatePicker label={CONTENT.startDate} />
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
