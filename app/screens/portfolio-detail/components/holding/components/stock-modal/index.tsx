import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, View } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/portfolio-detail/constants';
import { CreateModalHeader, SearchBar } from 'shared/components';
import { SEARCH_BAR_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { ModalProps } from 'shared/types';

const HEADER = SCREEN_CONTENT.assetPicker;

export const StockModal = ({ show, onClose }: ModalProps) => {
  return (
    <Modal onRequestClose={onClose} animationType="fade" visible={show}>
      <CreateModalHeader
        onClose={onClose}
        title={HEADER.stock}
        hasRightButton={false}
        bgColor={colorScheme.theme}
        headerStyle="light-content"
      />
      <View style={styles.searchBar}>
        <SearchBar
          borderColor={colorScheme.white}
          iconColor={colorScheme.white}
          textColor={colorScheme.white}
          selectionColor={colorScheme.white}
          placeHolderTextColor={colorScheme.gray100}
          placeholder={SEARCH_BAR_CONTENT.placeholder}
        />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: colorScheme.theme,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});
