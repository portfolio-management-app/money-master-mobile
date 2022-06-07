import { useNavigation, useRoute } from '@react-navigation/native';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { PlatformView } from 'shared/components';
import { styleProvider } from 'shared/styles';
import {
  Bank,
  Other,
  Crypto,
  Stock,
  Cash,
  RealEstate,
  Metal,
} from './components';

export const CreateAsset = () => {
  const routeProps = useRoute<RootStackScreenProps<'CreateAsset'>['route']>();
  const navigation = useNavigation();
  const { id, name, type } = routeProps.params.props;

  switch (type) {
    case 'custom':
      return (
        <PlatformView style={styleProvider.body}>
          <Other header={name} id={id} onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'bankSaving':
      return (
        <PlatformView style={styleProvider.body}>
          <Bank onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'cash':
      return (
        <PlatformView style={styleProvider.body}>
          <Cash onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'crypto':
      return (
        <PlatformView style={styleProvider.body}>
          <Crypto onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'stock':
      return (
        <PlatformView style={styleProvider.body}>
          <Stock onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'realEstate':
      return (
        <PlatformView style={styleProvider.body}>
          <RealEstate onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    case 'METAL':
      return (
        <PlatformView style={styleProvider.body}>
          <Metal onClose={() => navigation.goBack()} />
        </PlatformView>
      );
    default:
      return <PlatformView />;
  }
};
