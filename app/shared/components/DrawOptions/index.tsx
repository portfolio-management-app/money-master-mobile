import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ActionSheet,
  ButtonProps,
  TouchableOpacity,
} from 'react-native-ui-lib';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { Icon } from '../Icon';
import { TextContainer } from '../TextContainer';

interface IProps {
  show: boolean;
  onClose?: () => void;
  onTransferPortfolio?: () => void;
  onTransferToFund?: () => void;
  onTransferToOtherAsset?: () => void;
}

const ML = 10;

const Component = ({
  show,
  onClose,
  onTransferToFund,
  onTransferToOtherAsset,
}: IProps) => {
  return (
    <ActionSheet
      visible={show}
      title={ASSET_DETAIL_CONTENT.transferOption.title}
      onDismiss={onClose}
      destructiveButtonIndex={0}
      renderAction={(option: ButtonProps, index: number) => {
        switch (index) {
          case 0:
            return (
              <TouchableOpacity
                key={index}
                onPress={onTransferToOtherAsset}
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
                onPress={onTransferToFund}
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
        { label: ASSET_DETAIL_CONTENT.drawOption.cash },
        { label: ASSET_DETAIL_CONTENT.drawOption.investFund },
      ]}
    />
  );
};

export const DrawOptions = React.memo(Component);

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
