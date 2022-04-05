import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { PlatformView } from 'shared/components';
import { styleProvider } from 'shared/styles';
import { Bank, Other, Crypto, Stock, Cash, RealEstate } from './components';

export const CreateAsset = () => {
  const routeProps = useRoute<RootStackScreenProps<'CreateAsset'>['route']>();
  const navigation = useNavigation();
  const { id, name, type } = routeProps.params.props;

  switch (type) {
    case 'OTHER':
      return (
        <PlatformView style={styleProvider.body}>
          <Other header={name} id={id} onClose={() => navigation.goBack()} />
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
          <RealEstate onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    default:
      return <PlatformView />;
  }
};
