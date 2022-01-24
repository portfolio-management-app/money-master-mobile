import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import { fontProvider } from 'styles';

export const TextContainer = (props: TextProps) => {
  return (
    <Text style={[styles.text, props.style]} {...props}>
      {props.children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: fontProvider.openSans,
  },
});
