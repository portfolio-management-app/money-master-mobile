import { NavigationHeader } from 'navigation/header';
import React from 'react';
import { View } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';
import { PopoverMenu } from './PopoverMenu';

interface IProps {
  title: string;
}

export const Header = ({ title }: IProps) => {
  return (
    <NavigationHeader
      bgColor={colorScheme.theme}
      headerStyle="light-content"
      title={title}
      renderRightItem={() => {
        return (
          <View style={{ flexDirection: 'row' }}>
            <PopoverMenu />
          </View>
        );
      }}
    />
  );
};
