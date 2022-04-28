import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ActionSheet, ButtonProps } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { TextContainer } from '../TextContainer';

interface IProps {
  show: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
  title?: string;
}
const ML = 10;
const Component = ({ show, onClose, onConfirm, onCancel, title }: IProps) => {
  return (
    <ActionSheet
      visible={show}
      title={title}
      onDismiss={onClose}
      destructiveButtonIndex={0}
      renderAction={(option: ButtonProps, index: number) => {
        switch (index) {
          case 0:
            return (
              <TouchableOpacity
                key={index}
                onPress={onConfirm}
                style={styles.optionButton}
              >
                <TextContainer color={colorScheme.theme} ml={ML}>
                  {option.label}
                </TextContainer>
              </TouchableOpacity>
            );
          case 1:
            return (
              <TouchableOpacity
                key={index}
                onPress={onCancel}
                style={styles.optionButton}
              >
                <TextContainer color={colorScheme.red500} ml={ML}>
                  {option.label}
                </TextContainer>
              </TouchableOpacity>
            );
          default:
            return <></>;
        }
      }}
      options={[
        { label: APP_CONTENT.confirmModal.confirm },
        { label: APP_CONTENT.confirmModal.cancel },
      ]}
    />
  );
};

export const ConfirmSheet = React.memo(Component);

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
