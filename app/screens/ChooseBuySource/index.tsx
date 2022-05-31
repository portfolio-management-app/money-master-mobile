import { useNavigation, useRoute } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import {
  MainStackNavigationProp,
  RootStackScreenProps,
} from 'navigation/types';
import React from 'react';
import { TouchableOpacity } from 'react-native-ui-lib';
import { Icon, PlatformView, TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { SourceBuyStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';

const CONTENT = APP_CONTENT.buySource;
const ICON_SIZE = 20;
const ML = 10;

export const ChooseBuySource = observer(() => {
  const navigation = useNavigation<MainStackNavigationProp>();
  const routeProps =
    useRoute<RootStackScreenProps<'ChooseBuySource'>['route']>();
  const handleBuyFromOutSide = () => {
    SourceBuyStore.changeSource(false, false, 0);
    navigation.navigate('CreateAsset', {
      props: {
        type: routeProps.params.type,
        name: routeProps.params.otherAssetInfo.name,
        id: routeProps.params.otherAssetInfo.id,
      },
    });
  };
  const handleBuyFromFund = () => {
    SourceBuyStore.changeSource(true, false, 0);
    navigation.navigate('CreateAsset', {
      props: {
        type: routeProps.params.type,
        name: routeProps.params.otherAssetInfo.name,
        id: routeProps.params.otherAssetInfo.id,
      },
    });
  };
  const handleBuyFromCash = () => {
    navigation.navigate('CashAssetPicker', {
      actionType: 'BUY',
      source: undefined,
      type: routeProps.params.type,
      otherAssetInfo: routeProps.params.otherAssetInfo,
    });
  };
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={CONTENT.header} />
      <TouchableOpacity onPress={handleBuyFromFund} style={styleProvider.card}>
        <Icon.MaterialCommunity
          name="sack"
          size={ICON_SIZE + 10}
          color={colorScheme.black200}
        />
        <TextContainer ml={ML}>{CONTENT.fund}</TextContainer>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleBuyFromCash} style={styleProvider.card}>
        <Icon.FontAwesome5
          name="money-bill-wave-alt"
          size={ICON_SIZE}
          color={colorScheme.black200}
        />
        <TextContainer ml={ML}>{CONTENT.cash}</TextContainer>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleBuyFromOutSide}
        style={styleProvider.card}
      >
        <Icon.Material
          name="money"
          size={ICON_SIZE + 10}
          color={colorScheme.black200}
        />
        <TextContainer ml={ML}>{CONTENT.outside}</TextContainer>
      </TouchableOpacity>
    </PlatformView>
  );
});
