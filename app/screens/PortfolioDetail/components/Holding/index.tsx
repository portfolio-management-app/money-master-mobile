import { useNavigation } from '@react-navigation/native';
import { Observer } from 'mobx-react-lite';
import { screenName } from 'navigation/screen-names';
import React from 'react';
import {
  FloatingButton,
  Icon,
  PlatformView,
  TransparentLoading,
} from 'shared/components';
import { PortfolioDetailStore } from 'shared/stores';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetGroup } from './components';

const Component = () => {
  const navigation = useNavigation();

  const toggle = () => {
    navigation.navigate(screenName.assetPicker as never);
  };
  return (
    <PlatformView style={[styleProvider.body]}>
      <AssetGroup />
      <FloatingButton onPress={toggle} placement="bottom-right">
        <Icon.Material color={colorScheme.white} size={25} name="add" />
      </FloatingButton>
      <Observer>
        {() => {
          const { loading } = PortfolioDetailStore;
          return <TransparentLoading show={loading} />;
        }}
      </Observer>
    </PlatformView>
  );
};

export const Holding = React.memo(Component);
