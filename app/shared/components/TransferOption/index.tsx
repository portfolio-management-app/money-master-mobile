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
  onTransferOtherAsset?: () => void;
}

const ML = 10;

const Component = ({
  show,
  onClose,
  onTransferOtherAsset,
  onTransferPortfolio,
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
                onPress={onTransferPortfolio}
                style={styles.optionButton}
              >
                <Icon.MaterialCommunity
                  size={25}
                  name="briefcase"
                  color={colorScheme.black200}
                />
                <TextContainer ml={ML}>{option.label}</TextContainer>
              </TouchableOpacity>
            );
          case 1:
            return (
              <TouchableOpacity
                key={index}
                onPress={onTransferOtherAsset}
                style={styles.optionButton}
              >
                <Icon.FontAwesome5
                  size={25}
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
        { label: ASSET_DETAIL_CONTENT.transferOption.portfolio },
        { label: ASSET_DETAIL_CONTENT.transferOption.asset },
      ]}
    />
  );
};

export const TransferOptions = React.memo(Component);

const styles = StyleSheet.create({
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
});
