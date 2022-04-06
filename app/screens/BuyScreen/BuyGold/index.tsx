import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native';
import {
  TextContainer,
  CustomTextField,
  CurrencyPicker,
  BaseButton,
  PlatformView,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { MetalStore } from 'shared/stores';
import { styleProvider, colorScheme } from 'shared/styles';
import { PriceSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';
const CONTENT = APP_CONTENT.buyScreen;

export const BuyGold = observer(() => {
  const { information } = MetalStore;
  const { xauPrice, curr } = information.items[0];
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={APP_CONTENT.metalDetailScreen.gold} />
      <Formik
        validationSchema={PriceSchema}
        onSubmit={(values) => console.log(values)}
        initialValues={{ currency: curr, amount: 0 }}
      >
        {({ handleChange, handleBlur, values, touched, errors }) => {
          const renderCurrentPrice = formatCurrency(xauPrice, curr);

          return (
            <View style={styleProvider.formBody}>
              <View style={styleProvider.centerHorizontal}>
                <TextContainer mb={20} bold>
                  {CONTENT.currencyPrice}:{' '}
                </TextContainer>
                <TextContainer mb={20}>{renderCurrentPrice}/spot</TextContainer>
              </View>

              <CustomTextField
                onBlur={handleBlur('amount')}
                value={values.amount.toString()}
                onChangeText={handleChange('amount')}
                placeholder={CONTENT.amount}
                errorMessage={touched.amount ? errors.amount : ''}
              />
              <CurrencyPicker
                onChange={(val) => MetalStore.getMetalData(val)}
                initVal={curr}
              />
              <BaseButton
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
