import { TextContainer } from 'components';
import React from 'react';
import { StyleSheet } from 'react-native';
import { RadioButton, RadioGroup } from 'react-native-ui-lib';
import { colorScheme, fontProvider } from 'styles';

interface IProps {
  values: string[];
  title: string;
}

export const RadioPicker = ({ values, title }: IProps) => {
  return (
    <RadioGroup style={styles.radio} initialValue={values[0]}>
      <TextContainer type="small">{title}</TextContainer>
      {values.map((value) => (
        <RadioButton
          labelStyle={{ marginRight: 10, fontFamily: fontProvider.openSans }}
          key={value}
          size={20}
          color={colorScheme.theme}
          label={value}
          value={value}
        ></RadioButton>
      ))}
    </RadioGroup>
  );
};

const styles = StyleSheet.create({
  radio: { flexDirection: 'row', marginBottom: 20, alignItems: 'center' },
});
