import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Menu,
  MenuTrigger,
  MenuOptions,
  MenuOption,
} from 'react-native-popup-menu';

import { Checkbox } from 'react-native-ui-lib';
import { Icon } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  onFilter?: (type: string) => void;
}

type FilterType = {
  sortByDate: boolean;
  sortByBalance: boolean;
};

export const PopoverMenu = ({ onFilter }: IProps) => {
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
    <Menu>
      <MenuTrigger>
        <Icon.Ioni color={colorScheme.white} size={30} name="filter" />
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
  );
};

const styles = StyleSheet.create({
  checkBoxLabel: {
    fontSize: 18,
  },
});
