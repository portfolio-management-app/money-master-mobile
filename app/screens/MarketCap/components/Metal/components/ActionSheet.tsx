import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { ActionSheet } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';

interface IProps {
  show: boolean;
  onClose?: () => void;
  type: string;
}

export const ActionBottomSheet = ({ show, onClose, type }: IProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const onBuy = async () => {
    console.log(type);
    navigation.navigate('PortfolioPicker', { type: 'METAL' });
  };
  return (
    <ActionSheet
      visible={show}
      useNativeIOS
      title={APP_CONTENT.action}
      onDismiss={onClose}
      cancelButtonIndex={3}
      destructiveButtonIndex={0}
      showCancelButton
      options={[
        { label: APP_CONTENT.buy, onPress: () => onBuy() },
        { label: APP_CONTENT.sell },
      ]}
    />
  );
};
