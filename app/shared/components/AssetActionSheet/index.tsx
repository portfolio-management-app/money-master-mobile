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
  onBuyPress?: () => void;
  onSellPress?: () => void;
}

const ML = 10;

const Component = ({ show, onClose, onBuyPress, onSellPress }: IProps) => {
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
                onPress={onBuyPress}
                style={styles.optionButton}
              >
                <Icon.Material
                  size={25}
                  name="add-box"
                  color={colorScheme.black200}
                />
                <TextContainer ml={ML}>{option.label}</TextContainer>
              </TouchableOpacity>
            );
          case 1:
            return (
              <TouchableOpacity
                key={index}
                onPress={onSellPress}
                style={styles.optionButton}
              >
                <Icon.Entypo
                  size={25}
                  name="squared-minus"
                  color={colorScheme.black200}
                />
                <TextContainer ml={ML}>{option.label}</TextContainer>
              </TouchableOpacity>
            );
          default:
            return <></>;
        }
      }}
      options={[{ label: APP_CONTENT.buy }, { label: APP_CONTENT.sell }]}
    />
  );
};

export const AssetActionSheet = React.memo(Component);

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
