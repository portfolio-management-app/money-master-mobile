import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { PlatformView } from 'shared/components';
import { styleProvider } from 'shared/styles';
import { AssetType, ScreenParams } from 'shared/types';
import { Bank, Other, Crypto, Stock, Cash } from './components';

interface Param extends ScreenParams {
  params: {
    type: AssetType;
  };
}

export const CreateAsset = () => {
  const routeProps = useRoute<Param>();
  const navigation = useNavigation();

  switch (routeProps.params.type) {
    case 'OTHER':
      return (
        <PlatformView style={styleProvider.body}>
          <Other onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'BANKING':
      return (
        <PlatformView style={styleProvider.body}>
          <Bank onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'CASH':
      return (
        <PlatformView style={styleProvider.body}>
          <Cash onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'CRYPTO':
      return (
        <PlatformView style={styleProvider.body}>
          <Crypto onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'STOCK':
      return (
        <PlatformView style={styleProvider.body}>
          <Stock onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'REAL-ESTATE':
      return (
        <PlatformView style={styleProvider.body}>
          <Other onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    default:
      return <PlatformView />;
  }
};
