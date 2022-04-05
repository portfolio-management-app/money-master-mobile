import { useRoute } from '@react-navigation/native';
import { NavigationHeader } from 'navigation/header';
import { RootStackScreenProps } from 'navigation/types';
import React from 'react';
import { PlatformView } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { styleProvider } from 'shared/styles';
import { MetalDetailScreenProps } from 'shared/types';
import { Body } from './components';
const CONTENT = APP_CONTENT.metalDetailScreen;

export const MetalDetail = () => {
  const routeProps = useRoute<RootStackScreenProps<'MetalDetail'>['route']>();
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={getHeaderTitle(routeProps.params.type)} />
      <Body type={routeProps.params.type} />
    </PlatformView>
  );
};

const getHeaderTitle = (type: MetalDetailScreenProps) => {
  switch (type) {
    case 'silver':
      return CONTENT.silver;
    case 'gold':
      return CONTENT.gold;
  }
};
