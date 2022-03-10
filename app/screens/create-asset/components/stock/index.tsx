import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/portfolio-detail/constants';
import { CreateModalHeader, SearchBar } from 'shared/components';
import { SEARCH_BAR_CONTENT } from 'shared/constants';
import { ModalProps } from 'shared/types';

const HEADER = SCREEN_CONTENT.assetPicker;

const Component = ({ onClose }: ModalProps) => {
  return (
    <>
      <CreateModalHeader
        onClose={onClose}
        title={HEADER.stock}
        hasRightButton={false}
      />
      <View style={styles.searchBar}>
        <SearchBar placeholder={SEARCH_BAR_CONTENT.placeholder} />
      </View>
    </>
  );
};

export const Stock = React.memo(Component);

const styles = StyleSheet.create({
  searchBar: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
