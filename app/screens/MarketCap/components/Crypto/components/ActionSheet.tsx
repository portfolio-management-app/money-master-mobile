import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { AssetActionSheet } from 'shared/components';
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
    navigation.navigate('PortfolioPicker', {
      type: 'crypto',
      actionType: 'BUY',
    });
  };

  const onSell = async () => {
    await Promise.all([
      PortfolioListStore.getPortfolioList(),
      CoinDetailStore.getCoinInfo(coinId),
    ]);
    navigation.navigate('PortfolioPicker', {
      type: 'crypto',
      actionType: 'SELL',
    });
  };
  return (
    <AssetActionSheet
      onSellPress={onSell}
      show={show}
      onClose={onClose}
      onBuyPress={onBuy}
    />
  );
};
