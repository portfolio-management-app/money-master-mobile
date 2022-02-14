import React from 'react';
import { StyleSheet } from 'react-native';
import { Input, InputProps } from 'react-native-elements';
import { colorScheme, fontProvider } from 'shared/styles';

export const TextField = (props: InputProps) => {
  return (
    <Input
      labelStyle={styles.label}
      inputStyle={styles.textField}
      containerStyle={styles.container}
      inputContainerStyle={styles.textFieldContainer}
      autoCompleteType={{}}
      {...props}
    />
  );
};
const styles = StyleSheet.create({
  textField: {
    fontFamily: fontProvider.openSans,
    fontSize: 14,
    margin: 0,
    padding: 0,
  },
  textFieldContainer: {
    borderBottomWidth: 0.5,
    padding: 0,
    margin: 0,
  },
  container: {
    margin: 0,
    padding: 0,
  },
  label: {
    fontFamily: fontProvider.openSans,
    fontSize: 14,
    fontWeight: '200',
    color: colorScheme.gray600,
  },
});
