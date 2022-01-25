import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { colorScheme, fontProvider } from 'styles';

interface IProps extends TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4';
}

export const TextContainer = (props: IProps) => {
  const { style, children, type, ...res } = props;

  const fontSize = getFontSize(type);

  return (
    <Text style={[styles.text, style, { fontSize: fontSize }]} {...res}>
      {children}
    </Text>
  );
};

const getFontSize = (type?: IProps['type']) => {
  switch (type) {
    case 'h1':
      return 24;
    case 'h2':
      return 22;
    case 'h3':
      return 20;
    case 'h4':
      return 18;
    default:
      return 16;
  }
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fontProvider.openSans,
    fontSize: 16,
    color: colorScheme.black200,
  },
});