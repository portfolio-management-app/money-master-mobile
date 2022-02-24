import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

import { Checkbox } from 'react-native-ui-lib';
import { Icon, SearchBar } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  searchPlaceHolder?: string;
  onFilter?: (sortType: string) => void;
  onSearch?: (value: string) => void;
}

export const SearchFilterBar = ({
  searchPlaceHolder,
  onFilter,
  onSearch,
}: IProps) => {
  return (
    <View style={styles.searchContainer}>
      <SearchBar />
      <Menu>
        <MenuTrigger>
          <Icon.Ioni size={30} name="filter" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              padding: 10,
            },
          }}
        >
          <MenuOption>
            <Checkbox
              labelStyle={styles.checkBoxLabel}
              value
              color={colorScheme.theme}
              label="Date"
            />
          </MenuOption>
          <MenuOption>
            <Checkbox
              labelStyle={styles.checkBoxLabel}
              color={colorScheme.theme}
              label="Balance"
            />
          </MenuOption>
        </MenuOptions>
      </Menu>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    paddingTop: 20,
    flexDirection: 'row',
  },
  checkBoxLabel: {
    fontSize: 18,
  },
});
