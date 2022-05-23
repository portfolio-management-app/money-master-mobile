import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import { Icon, TextContainer } from 'shared/components';
import { ASSET_DETAIL_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { AssetActionType } from 'shared/types';

interface IProps {
  onPress: (type: AssetActionType) => void;
  buttonColor?: string;
}

const Component = ({ onPress, buttonColor = colorScheme.black200 }: IProps) => {
  return (
    <Menu>
      <MenuTrigger>
        <Icon.Ioni
          name="settings"
          size={25}
          style={{ marginRight: 10 }}
          color={buttonColor}
        />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 10,
            padding: 10,
          },
        }}
      >
        <MenuOption onSelect={() => onPress('edit')} style={styles.menuItem}>
          <Icon.MaterialCommunity
            color={colorScheme.black200}
            size={20}
            name="briefcase-edit"
          />
          <TextContainer ml={10}>{ASSET_DETAIL_CONTENT.edit}</TextContainer>
        </MenuOption>
        <MenuOption onSelect={() => onPress('delete')} style={styles.menuItem}>
          <Icon.MaterialCommunity
            color={colorScheme.black200}
            size={20}
            name="delete"
          />
          <TextContainer ml={10}>{ASSET_DETAIL_CONTENT.delete}</TextContainer>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
};

export const PopoverMenuSetting = React.memo(Component);

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
