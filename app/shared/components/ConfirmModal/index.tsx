import React from 'react';
import { StyleSheet } from 'react-native';
import { DialogProps, Dialog, View } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { BaseButton } from '../Button';
import { TextContainer } from '../TextContainer';

interface IProps extends DialogProps {
  title: string;
  confirmText?: string;
  cancelText?: string;
  onConfirmPress?: () => void;
  onCancelPress?: () => void;
}

const CONTENT = APP_CONTENT.confirmModal;

export const ConfirmModal = ({
  title,
  cancelText = CONTENT.cancel,
  confirmText = CONTENT.confirm,
  onCancelPress,
  onConfirmPress,
  ...res
}: IProps) => {
  return (
    <Dialog {...res}>
      <View style={styleProvider.dialog}>
        <TextContainer type="h4">{title}</TextContainer>
        <View style={styles.buttonContainer}>
          <BaseButton
            label={confirmText}
            style={styles.confirmButton}
            onPress={onConfirmPress}
          />
          <BaseButton
            label={cancelText}
            style={styles.cancelButton}
            onPress={onCancelPress}
          />
        </View>
      </View>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  confirmButton: {
    backgroundColor: colorScheme.theme,
    borderRadius: 10,
    marginRight: 30,
  },
  cancelButton: {
    backgroundColor: colorScheme.red500,
    borderRadius: 10,
  },

  buttonContainer: {
    flexDirection: 'row',
    marginTop: 30,
  },
});
