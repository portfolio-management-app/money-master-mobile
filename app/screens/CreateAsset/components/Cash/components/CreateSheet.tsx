import { Formik } from 'formik';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import {
  BaseButton,
  BottomSheet,
  CustomTextField,
  TextContainer,
} from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { PriceSchema } from 'shared/validator';
import { ICurrencyPrice } from '../index';

interface IProps {
  open: boolean;
  price?: ICurrencyPrice;
  onClose: () => void;
  name: string;
}
const CONTENT = APP_CONTENT.addMarketAsset;

const Component = ({ open, price, onClose, name }: IProps) => {
  return (
    <BottomSheet height={280} onClose={onClose} open={open}>
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
                <TextContainer>{price?.c}</TextContainer>
              </View>
              <CustomTextField
                placeholder={CONTENT.amount}
                value={values.amount.toString()}
                onChangeText={handleChange('amount')}
                onBlur={handleBlur('amount')}
                errorMessage={touched.amount ? errors.amount : ''}
              />

              <BaseButton
                style={{ backgroundColor: colorScheme.theme }}
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
