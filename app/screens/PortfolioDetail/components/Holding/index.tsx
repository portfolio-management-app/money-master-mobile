import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { FloatingButton, Icon, PlatformView } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { AssetGroup } from './components';

const Component = () => {
  const navigation = useNavigation<MainStackNavigationProp>();

  const toggle = () => {
    navigation.navigate('AssetTypePicker');
  };
  return (
    <PlatformView style={[styleProvider.body]}>
      <AssetGroup />
      <FloatingButton onPress={toggle} placement="bottom-right">
        <Icon.Material color={colorScheme.white} size={25} name="add" />
      </FloatingButton>
    </PlatformView>
  );
};

export const Holding = React.memo(Component);
