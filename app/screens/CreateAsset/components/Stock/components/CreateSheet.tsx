import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { covertCurrency } from 'services/currency-service';
import {
  BaseButton,
  BottomSheet,
  CurrencyPicker,
  CustomTextField,
  renderPickerForPortfolio,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { usePrevious } from 'shared/hooks';
import { colorScheme, styleProvider } from 'shared/styles';
import { PriceSchema } from 'shared/validator';
import { formatCurrency } from 'utils/number';
import { IStockPrice } from '../index';

interface IProps {
  open: boolean;
  stockPrice?: IStockPrice;
  onClose: () => void;
  name: string;
}
const CONTENT = APP_CONTENT.addMarketAsset;

const Component = ({ open, stockPrice, onClose, name }: IProps) => {
  const [currency, setCurrency] = React.useState('USD');
  const [price, setPrice] = React.useState(0);
  const prevCurrency = usePrevious(currency);

  const converter = React.useCallback(async (from: string, to: string) => {
    const res = await covertCurrency(from, to);
    if (res) {
      setPrice((price) => price * res);
    }
  }, []);

  React.useEffect(() => {
    converter(prevCurrency as string, currency);
  }, [converter, currency, prevCurrency]);

  React.useEffect(() => {
    setPrice(stockPrice ? stockPrice.c : 0);
  }, [stockPrice]);

  return (
    <BottomSheet height={350} onClose={onClose} open={open}>
      <Formik
        validationSchema={PriceSchema}
        onSubmit={(values) => console.log(values)}
        initialValues={{ amount: 0 }}
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
                  {stockPrice && formatCurrency(price, currency)}
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
                onChange={(val) => setCurrency(val)}
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
