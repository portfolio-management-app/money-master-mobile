import { Icon, TextContainer } from 'shared/components';
import React from 'react';
import { colorScheme } from 'shared/styles';
import { View } from 'react-native-ui-lib';
import { BOTTOM_TAB_CONTENT } from '../index';

interface IProps {
  focused: boolean;
}
export const PortfolioTab = ({ focused }: IProps) => {
  return (
    <View center>
      <Icon.MaterialCommunity
        name="briefcase"
        size={25}
        color={focused ? colorScheme.bottomTabSelected : colorScheme.black200}
      />

      <TextContainer
        style={{
          color: focused ? colorScheme.bottomTabSelected : colorScheme.black200,
        }}
        type="xxx-small"
      >
        {BOTTOM_TAB_CONTENT.portfolio}
      </TextContainer>
    </View>
  );
};
