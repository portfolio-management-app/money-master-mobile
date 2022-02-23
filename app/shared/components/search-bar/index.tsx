import React from 'react';
import { TextInput } from 'react-native';

export const CustomSearchBar = () => {
  const [search, setSearch] = React.useState('');

  const updateSearch = (search: string) => {
    setSearch(search);
  };
  return <TextInput></TextInput>;
};
