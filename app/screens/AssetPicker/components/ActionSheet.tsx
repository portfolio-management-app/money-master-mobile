import React from 'react';
import { ActionSheet } from 'react-native-ui-lib';

interface IProps {
  show: boolean;
  onClose?: () => void;
  assetTypeId: number;
}

export const ActionBottomSheet = ({ show, onClose, assetTypeId }: IProps) => {
  console.log(assetTypeId);
  return (
    <ActionSheet
      visible={show}
      title={'Title'}
      onDismiss={onClose}
      message={'Message goes here'}
      cancelButtonIndex={3}
      destructiveButtonIndex={0}
      options={[{ label: 'Cancel', onPress: () => console.log('cancel') }]}
    />
  );
};
