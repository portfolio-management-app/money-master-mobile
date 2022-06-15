import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { Icon } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { ICON_SIZE, SCREEN_CONTENT } from '../../constant';
import { Common } from './Common';

export const Security = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  return (
    <Common
      onPress={() => navigation.navigate('UpdatePassword')}
      icon={
        <Icon.Material
          color={colorScheme.black200}
          size={ICON_SIZE}
          name="lock"
        />
      }
      title={SCREEN_CONTENT.updatePassword}
    />
  );
};
