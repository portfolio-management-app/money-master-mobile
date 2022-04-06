import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { SCREEN_CONTENT } from 'screens/PortfolioDetail/constants';
import { CreateModalHeader, MetalPrice } from 'shared/components';
import { ModalProps } from 'shared/types';

const HEADER = SCREEN_CONTENT.assetPicker;

const Component = ({ onClose }: ModalProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();

  const onBuyGold = () => {
    navigation.navigate('BuyGold');
  };
  const onBuySilver = () => {
    navigation.navigate('BuySilver');
  };
  return (
    <>
      <CreateModalHeader
        onClose={onClose}
        title={HEADER.metal}
        hasRightButton={false}
      />
      <MetalPrice onGoldPress={onBuyGold} onSilverPress={onBuySilver} />
    </>
  );
};

export const Metal = React.memo(Component);
