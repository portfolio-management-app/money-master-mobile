import React from 'react';
import { Dialog, DialogProps, View } from 'react-native-ui-lib';
import { styleProvider } from 'shared/styles';
import { RadioPickerProps } from 'shared/types';
import { RadioPicker } from '../RadioPicker';

interface IProps extends DialogProps {
  pickerProps: RadioPickerProps;
}

export const DialogPicker = (props: IProps) => {
  const { pickerProps, ...res } = props;
  return (
    <Dialog {...res}>
      <View style={styleProvider.dialog}>
        <RadioPicker {...pickerProps} />
      </View>
    </Dialog>
  );
};
