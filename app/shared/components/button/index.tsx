import React from 'react';
import { Button, ButtonProps } from 'react-native-ui-lib';
import { fontProvider } from 'shared/styles';

export const BaseButton = (props: ButtonProps) => {
  return (
    <Button {...props} labelStyle={{ fontFamily: fontProvider.openSans }} />
  );
};
