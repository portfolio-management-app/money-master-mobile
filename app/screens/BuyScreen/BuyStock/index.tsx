import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import {
  BaseButton,
  CustomTextField,
  PlatformView,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { StockDetailStore } from 'shared/stores';
import { styleProvider, colorScheme } from 'shared/styles';
import { PriceSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';
const CONTENT = APP_CONTENT.buyScreen;

export const BuyStock = observer(() => {
  const { stockInformation, symbol } = StockDetailStore;

  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={symbol} />
      <Formik
        validationSchema={PriceSchema}
        onSubmit={(values) => console.log(values)}
        initialValues={{ currency: 'USD', amount: 0 }}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => {
          return (
            <View style={styleProvider.formBody}>
              <View style={styleProvider.centerHorizontal}>
                <TextContainer mb={20} bold>
                  {CONTENT.currencyPrice}:{' '}
                </TextContainer>
                <TextContainer mb={20}>
                  {formatCurrency(stockInformation.c, values.currency)}
                </TextContainer>
              </View>

              <CustomTextField
                onBlur={handleBlur('amount')}
                value={values.amount.toString()}
                onChangeText={handleChange('amount')}
                placeholder={CONTENT.amount}
                errorMessage={touched.amount ? errors.amount : ''}
              />

              <BaseButton
                label={CONTENT.buy}
                backgroundColor={colorScheme.theme}
              />
            </View>
          );
        }}
      </Formik>
    </PlatformView>
  );
});
