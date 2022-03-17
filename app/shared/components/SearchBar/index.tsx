import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { View } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';
import { Icon } from '../Icon';

interface IProps {
  onSearch?: (value: string) => void;
  placeholder: string;
  placeHolderTextColor?: string;
  borderColor?: string;
  iconColor?: string;
  selectionColor?: string;
  textColor?: string;
  onFocus?: (e: any) => void;
}

export const SearchBar = ({
  onSearch,
  onFocus,
  placeholder,
  iconColor = colorScheme.black200,
  placeHolderTextColor = colorScheme.gray400,
  borderColor = colorScheme.gray400,
  selectionColor = colorScheme.theme,
  textColor = colorScheme.black200,
}: IProps) => {
  const [search, setSearch] = React.useState('');

  const updateSearch = React.useCallback(
    (search: string) => {
      setSearch(search);
      if (onSearch) onSearch(search);
    },
    [onSearch]
  );
  return (
    <View style={[styles.searchContainer, { borderColor: borderColor }]}>
      <Icon.Feather
        name="search"
        size={25}
        style={{ marginRight: 10 }}
        color={iconColor}
      />

      <TextInput
        onFocus={onFocus}
        value={search}
        placeholder={placeholder}
        style={[styles.searchField, { color: textColor }]}
        placeholderTextColor={placeHolderTextColor}
        onChangeText={updateSearch}
        selectionColor={selectionColor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchField: {
    padding: 5,
    fontSize: 16,

    width: '100%',
  },
  searchContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    overflow: 'hidden',
    borderWidth: 0.5,
    borderRadius: 10,
  },
});
