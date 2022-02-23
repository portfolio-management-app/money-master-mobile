import React from 'react';
import { StyleSheet, TextStyle, View, ViewStyle } from 'react-native';
import { Incubator } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  errorMessage?: string;
  secureText?: boolean;
  placeholder: string;
  maxLength?: number;
  onChangeText?: (value: string) => void;
}

export const CustomTextField = ({
  errorMessage,
  secureText,
  onChangeText,
  placeholder,
  maxLength,
}: IProps) => {
  const { fieldStyle, labelStyle } = getStyles(errorMessage);
  return (
    <View>
      <Incubator.TextField
        text70BL
        fieldStyle={fieldStyle}
        secureTextEntry={secureText}
        placeholder={placeholder}
        floatingPlaceholder
        onChangeText={onChangeText}
        showCharCounter
        floatOnFocus
        floatingPlaceholderStyle={labelStyle}
        maxLength={maxLength}
      />
      <TextContainer type="extra-small" style={styles.errorMessage}>
        {errorMessage}
      </TextContainer>
    </View>
  );
};

const getStyles = (errorMessage?: string) => {
  const fieldStyle: ViewStyle = {
    borderBottomWidth: 0.5,
  };
  const labelStyle: TextStyle = {
    fontSize: 16,
  };

  return { fieldStyle, labelStyle };
};
const styles = StyleSheet.create({
  errorMessage: {
    color: colorScheme.red500,
    marginTop: 10,
  },
});
