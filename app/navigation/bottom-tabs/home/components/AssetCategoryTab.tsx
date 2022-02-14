import { TextContainer } from 'shared/components';
import { Observer } from 'mobx-react-lite';
import React from 'react';
import { View } from 'react-native';
import { Icon } from 'react-native-elements';
import { LocaleStore } from 'shared/stores';
import { colorScheme, iconProvider } from 'shared/styles';

interface IProps {
  focused: boolean;
}
export const AssetCategoryTab = ({ focused }: IProps) => {
  return (
    <View>
      <Icon
        name="attach-money"
        tvParallaxProperties={{}}
        size={25}
        type={iconProvider.material}
        color={focused ? colorScheme.theme : colorScheme.gray400}
      ></Icon>
      <Observer>
        {() => {
          const { locale } = LocaleStore;
          return (
            <TextContainer
              style={{
                color: focused ? colorScheme.theme : colorScheme.gray400,
              }}
              type="xxx-small"
            >
              {locale.bottomTab.category}
            </TextContainer>
          );
        }}
      </Observer>
    </View>
  );
};
