import React from 'react';
import { ActionSheet } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';

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
      title={APP_CONTENT.action}
      onDismiss={onClose}
      destructiveButtonIndex={0}
      options={[{ label: APP_CONTENT.edit }, { label: APP_CONTENT.delete }]}
    />
  );
};
