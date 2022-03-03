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
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, dimensionProvider } from 'shared/styles';

const SEARCH_BAR_CONTENT = APP_CONTENT.searchBar;

interface IProps {
  onFilter?: (type: string) => void;
  onSearch?: (value: string) => void;
}

type FilterType = {
  sortByDate: boolean;
  sortByBalance: boolean;
};

export const SearchFilterBar = ({ onFilter, onSearch }: IProps) => {
  const [filerValue, setFilterValue] = React.useState<FilterType>({
    sortByDate: true,
    sortByBalance: false,
  });

  const handleFilter = React.useCallback(
    (type: 'date' | 'balance') => {
      if (type === 'date') {
        setFilterValue({ sortByBalance: false, sortByDate: true });
        if (onFilter) onFilter('date');
      } else {
        setFilterValue({ sortByBalance: true, sortByDate: false });
        if (onFilter) onFilter('balance');
      }
    },
    [onFilter]
  );

  return (
    <View style={styles.searchContainer}>
      <SearchBar
        onSearch={onSearch}
        placeholder={SEARCH_BAR_CONTENT.placeholder}
      />
      <Menu>
        <MenuTrigger>
          <Icon.Ioni size={30} style={{ marginLeft: 10 }} name="filter" />
        </MenuTrigger>
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              padding: 10,
            },
          }}
        >
          <MenuOption onSelect={() => handleFilter('date')}>
            <Checkbox
              labelStyle={styles.checkBoxLabel}
              value={filerValue.sortByDate}
              color={colorScheme.theme}
              label="Date"
            />
          </MenuOption>
          <MenuOption onSelect={() => handleFilter('balance')}>
            <Checkbox
              value={filerValue.sortByBalance}
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
    width: dimensionProvider.width - 80,
  },
  checkBoxLabel: {
    fontSize: 18,
  },
});
