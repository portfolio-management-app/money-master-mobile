import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { AssetActionSheet } from 'shared/components';
import { PortfolioListStore } from 'shared/stores';

interface IProps {
  show: boolean;
  onClose?: () => void;
  type: string;
}

export const ActionBottomSheet = ({ show, onClose, type }: IProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const onBuy = async () => {
    await PortfolioListStore.getPortfolioList();
    if (type === 'gold')
      navigation.navigate('PortfolioPicker', {
        type: 'METAL',
        metalType: 'gold',
      });
    else
      navigation.navigate('PortfolioPicker', {
        type: 'METAL',
        metalType: 'silver',
      });
  };
  return <AssetActionSheet show={show} onBuyPress={onBuy} onClose={onClose} />;
};
