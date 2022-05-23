import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { PopoverMenuSetting } from 'shared/components';
import { IPortfolio } from 'shared/models';
import { colorScheme } from 'shared/styles';
import { AssetActionType } from 'shared/types';

interface IProps {
  portfolio: IPortfolio;
}

export const Header = observer(({ portfolio }: IProps) => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const handleMenuPress = (type: AssetActionType) => {
    switch (type) {
      case 'edit':
        navigation.navigate('EditPortfolio', {
          portfolio: portfolio,
          editFrom: 'PortfolioDetail',
        });
        break;
    }
  };
  return (
    <NavigationHeader
      bgColor={colorScheme.theme}
      headerStyle="light-content"
      title={portfolio.name}
      renderRightItem={
        <PopoverMenuSetting
          buttonColor={colorScheme.white}
          onPress={handleMenuPress}
        />
      }
    />
  );
});
