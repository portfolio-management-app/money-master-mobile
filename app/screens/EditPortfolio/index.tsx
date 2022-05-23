import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { PortfolioDetailStore, PortfolioListStore } from 'shared/stores';
import { EditPortfolioBody } from 'shared/stores/types';
import { colorScheme } from 'shared/styles';
import { Form } from './components';

export const EditPortfolio = observer(() => {
  const routeProps = useRoute<RootStackScreenProps<'EditPortfolio'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  const handleEdit = (body: EditPortfolioBody) => {
    switch (routeProps.params.editFrom) {
      case 'PortfolioList':
        PortfolioListStore.editPortfolio(body, routeProps.params.portfolio.id);
        break;
      case 'PortfolioDetail':
        PortfolioDetailStore.editPortfolio(
          body,
          routeProps.params.portfolio.id
        );
        break;
    }
  };

  const handleClose = () => {
    navigation.goBack();
  };
  return (
    <>
      <StatusBar backgroundColor={colorScheme.white} barStyle="dark-content" />
      <Form
        onClose={handleClose}
        onEdit={handleEdit}
        portfolio={routeProps.params.portfolio}
      />
    </>
  );
});
