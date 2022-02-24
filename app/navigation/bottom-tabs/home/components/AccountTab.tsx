import { Icon, TextContainer } from 'shared/components';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { LocaleStore } from 'shared/stores';
import { colorScheme } from 'shared/styles';
import { View } from 'react-native-ui-lib';

interface IProps {
  focused: boolean;
}
export const AccountTab = ({ focused }: IProps) => {
  return (
    <View center>
      <Icon.MaterialCommunity
        name="account"
        size={25}
        color={focused ? colorScheme.theme : colorScheme.black200}
      ></Icon.MaterialCommunity>
      <Observer>
        {() => {
          const { locale } = LocaleStore;
          return (
            <TextContainer
              style={{
                color: focused ? colorScheme.theme : colorScheme.black200,
              }}
              type="xxx-small"
            >
              {locale.bottomTab.account}
            </TextContainer>
          );
        }}
      </Observer>
    </View>
  );
};
