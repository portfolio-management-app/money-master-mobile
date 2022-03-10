import React from 'react';
import { StyleSheet } from 'react-native';
import { Dialog } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';
import { BaseButton } from '../Button';
import { TextContainer } from '../TextContainer';

interface IProps {
  show: boolean;
  onClose: () => void;
  message: string;
}

export const ErrorDialog = ({ show, onClose, message }: IProps) => {
  return (
    <Dialog containerStyle={styles.dialog} visible={show} panDirection="up">
      <TextContainer style={{ textAlign: 'center' }} type="h4">
        {message}
      </TextContainer>
      <BaseButton label="OK" style={styles.button} onPress={() => onClose()} />
    </Dialog>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 20,
    backgroundColor: colorScheme.white,
    padding: 20,
  },
  button: {
    backgroundColor: colorScheme.red500,
    marginTop: 20,
  },
});
