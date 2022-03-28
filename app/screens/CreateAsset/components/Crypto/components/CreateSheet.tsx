import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import {
  BaseButton,
  BottomSheet,
  CurrencyPicker,
  CustomTextField,
  renderPickerForPortfolio,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { PriceSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';

interface IProps {
  open: boolean;
  price?: any;
  onClose: () => void;
  name: string;
}
const CONTENT = APP_CONTENT.addMarketAsset;

const Component = ({ open, price, onClose, name }: IProps) => {
  return (
    <BottomSheet height={400} onClose={onClose} open={open}>
      <Formik
        validationSchema={PriceSchema}
        onSubmit={(values) => console.log(values)}
        initialValues={{ amount: 0, currency: 'USD' }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          touched,
          values,
          errors,
        }) => {
          return (
            <View style={styleProvider.container}>
              <TextContainer type="h4" textAl="center" mb={20} bold>
                {name}
              </TextContainer>
              <View style={styles.price}>
                <TextContainer bold>{CONTENT.currentPrice}: </TextContainer>
                <TextContainer>
                  {formatCurrency(
                    price[values.currency.toLowerCase()]
                      ? price[values.currency.toLowerCase()]
                      : 0,
                    values.currency
                  )}
                </TextContainer>
              </View>
              <CustomTextField
                placeholder={CONTENT.amount}
                value={values.amount.toString()}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                errorMessage={touched.amount ? errors.amount : ''}
              />
              <CurrencyPicker
                onChange={handleChange('currency')}
                renderPicker={renderPickerForPortfolio}
                initVal="USD"
              />
              <BaseButton
                style={{ backgroundColor: colorScheme.theme, marginTop: 30 }}
                label={CONTENT.add}
              />
            </View>
          );
        }}
      </Formik>
    </BottomSheet>
  );
};

export const CreateSheet = React.memo(Component);

const styles = StyleSheet.create({
  price: {
    flexDirection: 'row',
    marginBottom: 20,
  },
});
