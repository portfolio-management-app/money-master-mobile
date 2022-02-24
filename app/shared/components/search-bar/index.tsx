import React from 'react';
import { StyleSheet } from 'react-native';
import { Incubator, View } from 'react-native-ui-lib';
import { colorScheme, dimensionProvider } from 'shared/styles';
import { Icon } from '../icon';

export const SearchBar = () => {
  const [search, setSearch] = React.useState('');

  const updateSearch = (search: string) => {
    setSearch(search);
  };
  return (
    <View style={styles.searchContainer}>
      <Icon.Feather name="search" size={25} />
      <Incubator.TextField
        text70BL
        placeholder="Search"
        fieldStyle={styles.searchField}
        selectionColor={colorScheme.theme}
      ></Incubator.TextField>
    </View>
  );
};

const styles = StyleSheet.create({
  searchField: {
    borderBottomWidth: 0.5,
    borderBottomColor: colorScheme.black200,
    width: dimensionProvider.width - 150,
    marginLeft: 10,
  },
  searchContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
