import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { StatusBar } from 'react-native';
import { PlatformView, TransparentLoading } from 'shared/components';
import { PortfolioDetailStore, PortfolioListStore } from 'shared/stores';
import { EditPortfolioBody } from 'shared/stores/types';
import { colorScheme, styleProvider } from 'shared/styles';
import { Form } from './components';

export const EditPortfolio = observer(() => {
  const routeProps = useRoute<RootStackScreenProps<'EditPortfolio'>['route']>();
  const navigation = useNavigation<MainStackNavigationProp>();
  console.log(routeProps.params.portfolio);
  const handleEdit = async (body: EditPortfolioBody) => {
    switch (routeProps.params.editFrom) {
      case 'PortfolioList':
        await PortfolioListStore.editPortfolio(
          body,
          routeProps.params.portfolio.id
        );
        break;
      case 'PortfolioDetail':
        await PortfolioDetailStore.editPortfolio(
          body,
          routeProps.params.portfolio.id
        );
        break;
    }
    navigation.goBack();
  };

  const handleClose = () => {
    navigation.goBack();
  };
  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.white} barStyle="dark-content" />
      <Form
        onClose={handleClose}
        onEdit={handleEdit}
        portfolio={routeProps.params.portfolio}
      />
      <TransparentLoading
        show={PortfolioDetailStore.loading || PortfolioListStore.loading}
      />
    </PlatformView>
  );
});
