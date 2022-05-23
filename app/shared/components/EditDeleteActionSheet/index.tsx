import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ActionSheet,
  ButtonProps,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { Icon } from '../Icon';
import { TextContainer } from '../TextContainer';

interface IProps {
  show: boolean;
  onClose?: () => void;
  onEditPress?: () => void;
  onDeletePress?: () => void;
}

const ML = 10;

const Component = ({ show, onClose, onDeletePress, onEditPress }: IProps) => {
  return (
    <ActionSheet
      visible={show}
      title={APP_CONTENT.action}
      onDismiss={onClose}
      destructiveButtonIndex={0}
      renderAction={(option: ButtonProps, index: number) => {
        switch (index) {
          case 0:
            return (
              <TouchableOpacity
                key={index}
                onPress={onEditPress}
                style={styles.optionButton}
              >
                <Icon.MaterialCommunity
                  color={colorScheme.black200}
                  size={25}
                  name="briefcase-edit"
                />
                <TextContainer ml={ML}>{option.label}</TextContainer>
              </TouchableOpacity>
            );
          case 1:
            return (
              <TouchableOpacity
                key={index}
                onPress={onDeletePress}
                style={styles.optionButton}
              >
                <Icon.MaterialCommunity
                  color={colorScheme.black200}
                  size={25}
                  name="delete"
                />
                <TextContainer ml={ML}>{option.label}</TextContainer>
              </TouchableOpacity>
            );
          default:
            return <></>;
        }
      }}
      options={[{ label: APP_CONTENT.edit }, { label: APP_CONTENT.delete }]}
    />
  );
};

export const EditDeleteActionSheet = React.memo(Component);

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
