import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { ActionSheet } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { CoinDetailStore, PortfolioListStore } from 'shared/stores';

interface IProps {
  show: boolean;
  onClose?: () => void;
  coinId: string;
}

export const ActionBottomSheet = ({ show, onClose, coinId }: IProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const onBuy = async () => {
    await Promise.all([
      PortfolioListStore.getPortfolioList(),
      CoinDetailStore.getCoinInfo(coinId),
    ]);
    navigation.navigate('PortfolioPicker', { type: 'CRYPTO' });
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
