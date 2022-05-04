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
  onSellToCash?: () => void;
  onSellToInvestFund?: () => void;
}

const ML = 10;

const Component = ({
  show,
  onClose,
  onSellToCash,
  onSellToInvestFund,
}: IProps) => {
  return (
    <ActionSheet
      visible={show}
      title={APP_CONTENT.sellScreen.sellTo.title}
      onDismiss={onClose}
      destructiveButtonIndex={0}
      renderAction={(option: ButtonProps, index: number) => {
        switch (index) {
          case 0:
            return (
              <TouchableOpacity
                key={index}
                onPress={onSellToCash}
                style={styles.optionButton}
              >
                <Icon.FontAwesome5
                  size={20}
                  name="money-bill-wave-alt"
                  color={colorScheme.black200}
                />
                <TextContainer ml={ML}>{option.label}</TextContainer>
              </TouchableOpacity>
            );
          case 1:
            return (
              <TouchableOpacity
                key={index}
                onPress={onSellToInvestFund}
                style={styles.optionButton}
              >
                <Icon.FontAwesome5
                  size={20}
                  name="money-check-alt"
                  color={colorScheme.black200}
                />
                <TextContainer ml={ML}>{option.label}</TextContainer>
              </TouchableOpacity>
            );
          default:
            return <></>;
        }
      }}
      options={[
        { label: APP_CONTENT.sellScreen.sellTo.toCash },
        { label: APP_CONTENT.sellScreen.sellTo.toInvestFund },
      ]}
    />
  );
};

export const SellOptions = React.memo(Component);

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
