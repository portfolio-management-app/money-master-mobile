import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { fontProvider } from 'styles';

export const TextContainer = (props: TextProps) => {
  const { style, children, ...res } = props;
  return (
    <Text style={[styles.text, style]} {...res}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fontProvider.openSans,
  },
});
