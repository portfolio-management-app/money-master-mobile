import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { CurrencyPicker, CustomTextField } from 'shared/components';

export const CreateForm = () => {
  return (
    <View style={styles.formContainer}>
      <CustomTextField placeholder="Name" />
      <CustomTextField placeholder="Initial balance" />
      <CurrencyPicker />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    paddingHorizontal: 20,
  },
});
