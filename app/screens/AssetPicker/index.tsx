import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NavigationHeader } from 'navigation/header';
import { TouchableOpacity } from 'react-native-ui-lib';
import { PlatformView, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { ITEMS } from './constants';
import { StatusBar } from 'react-native';
import { screenName } from 'navigation/screen-names';
import { CreateAssetRouteProps } from 'shared/types';

const SCREEN_CONTENT = APP_CONTENT.portfolioDetail;

export const AssetPicker = () => {
  const navigation = useNavigation();

  const navigateToCreate = (id: number) => {
    const param: CreateAssetRouteProps = { type: 'OTHER' };
    switch (id) {
      case 0:
        param.type = 'CRYPTO';
        break;
      case 1:
        param.type = 'STOCK';
        break;
      case 2:
        param.type = 'BANKING';
        break;
      case 3:
        param.type = 'REAL-ESTATE';
        break;
      case 4:
        param.type = 'CASH';
        break;
    }
    navigation.navigate(screenName.createAsset as never, param as never);
  };

  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle="dark-content" />
      <NavigationHeader title={SCREEN_CONTENT.assetPicker.title} />
      {ITEMS.map((item) => (
        <TouchableOpacity
          onPress={() => navigateToCreate(item.id)}
          style={styleProvider.card}
          key={item.id}
        >
          {item.icon}
          <TextContainer style={{ marginLeft: 20 }}>{item.label}</TextContainer>
        </TouchableOpacity>
      ))}
    </PlatformView>
  );
};
