import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, View } from 'react-native';
import { Checkbox } from 'react-native-ui-lib';
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
  CurrencyDetailStore,
  PortfolioDetailStore,
  SourceBuyStore,
} from 'shared/stores';
import { CreateCurrencyAssetBody } from 'shared/stores/types';
import { colorScheme, styleProvider } from 'shared/styles';
import { CreateCurrencyAssetSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';

const CONTENT = APP_CONTENT.buyScreen;

export const BuyCash = observer(() => {
  const navigation = useNavigation();
  const { currencyInformation } = CurrencyDetailStore;
  const tokens = currencyInformation.s.split('/');
  const [currencyCode, setCurrencyCode] = React.useState(tokens[0]);
  const { createCurrencyAsset, loadingCreateCurrencyAsset, createResponse } =
    PortfolioDetailStore;

  const onCreate = React.useCallback(
    (values: CreateCurrencyAssetBody) => {
      createCurrencyAsset(values);
    },
    [createCurrencyAsset]
  );
  return (
    <PlatformView style={styleProvider.body}>
      <TransparentLoading show={loadingCreateCurrencyAsset} />
      <Formik
        validationSchema={CreateCurrencyAssetSchema}
        onSubmit={(values) => {
          values.amount = 1 * values.amount;
          values.fee = 1 * values.fee;
          values.tax = 1 * values.tax;
          values.currencyCode = currencyCode;
          onCreate(values);
        }}
        initialValues={{
          currencyCode: tokens[0],
          amount: 0,
          name: '',
          inputDay: new Date().toISOString(),
          description: '',
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
          return (
            <>
              <CreateModalHeader
                title={currencyInformation.s}
                onClose={() => navigation.goBack()}
                buttonLabel={APP_CONTENT.createAssetType.create}
                onCreate={handleSubmit}
              />
              <ScrollView>
                <View style={styleProvider.formBody}>
                  <View style={styleProvider.centerHorizontal}>
                    <TextContainer mb={20} bold>
                      {CONTENT.currencyPrice}:{' '}
                    </TextContainer>
                    <TextContainer mb={20}>
                      {formatCurrency(
                        parseFloat(currencyInformation.c),
                        tokens[1]
                      )}
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
                  <TextContainer mb={5}>{CONTENT.currencyCode}</TextContainer>
                  <Checkbox
                    color={colorScheme.theme}
                    containerStyle={{ marginBottom: 5 }}
                    onValueChange={() => setCurrencyCode(tokens[0])}
                    value={currencyCode === tokens[0]}
                    label={tokens[0]}
                  />
                  <Checkbox
                    color={colorScheme.theme}
                    onValueChange={() => setCurrencyCode(tokens[1])}
                    value={currencyCode === tokens[1]}
                    label={tokens[1]}
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
                    placeholder={`${APP_CONTENT.fee} (${currencyCode})`}
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
