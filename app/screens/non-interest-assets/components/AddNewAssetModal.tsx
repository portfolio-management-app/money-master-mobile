import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomSheet } from 'react-native-elements';
import { Button, View } from 'react-native-ui-lib';
import { colorScheme } from 'styles';

interface IProps {
  show: boolean;
  onHide: () => void;
}

export const AddNewAssetModal = ({ show, onHide }: IProps) => {
  return (
    <BottomSheet
      containerStyle={{ backgroundColor: colorScheme.loading }}
      isVisible={show}
    >
      <View style={styles.modal}>
        <Button style={styles.button} onPress={onHide} label="Cancel" />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    backgroundColor: colorScheme.theme,
  },
  modal: {
    backgroundColor: colorScheme.white,
    height: 500,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'flex-end',
    padding: 20,
  },
});
