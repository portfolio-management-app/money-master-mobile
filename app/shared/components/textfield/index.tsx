import React from 'react';
import { KeyboardTypeOptions, StyleSheet, View } from 'react-native';
import { Incubator } from 'react-native-ui-lib';
import { TextContainer } from 'shared/components';
import { colorScheme, fontProvider } from 'shared/styles';

interface IProps {
  errorMessage?: string;
  secureText?: boolean;
  placeholder: string;
  maxLength?: number;
  keyBoardType?: KeyboardTypeOptions;
  onChangeText?: (value: string) => void | void;
  onBlur?: (e: any) => void | void;
}

export const CustomTextField = ({
  errorMessage,
  secureText,
  onChangeText,
  placeholder,
  maxLength,
  onBlur,
  keyBoardType,
}: IProps) => {
  return (
    <View>
      <Incubator.TextField
        onBlur={onBlur}
        keyboardType={keyBoardType}
        selectionColor={colorScheme.theme}
        text70BL
        fieldStyle={styles.field}
        secureTextEntry={secureText}
        placeholder={placeholder}
        floatingPlaceholder
        onChangeText={onChangeText}
        showCharCounter
        floatOnFocus
        floatingPlaceholderStyle={styles.placeHolder}
        maxLength={maxLength}
      />
      <TextContainer
        type="extra-small"
        style={{ marginVertical: 10 }}
        color={colorScheme.red500}
      >
        {errorMessage}
      </TextContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  field: {
    borderBottomWidth: 0.5,
  },
  placeHolder: {
    fontSize: 16,
    fontFamily: fontProvider.openSans,
  },
});
