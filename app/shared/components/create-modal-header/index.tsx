import React from 'react';
import { StyleSheet } from 'react-native';
import { TouchableOpacity, View } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';
import { Icon } from '../icon';
import { TextContainer } from '../text-container';

interface IProps {
  title: string;
  onClose?: () => void;
  onCreate?: () => void;
}

export const CreateModalHeader = ({ title, onClose, onCreate }: IProps) => {
  return (
    <View style={styles.modal}>
      <Icon.Evil
        color={colorScheme.black200}
        size={30}
        name="close"
        onPress={onClose}
      />
      <TextContainer>{title}</TextContainer>
      <TouchableOpacity onPress={onCreate}>
        <TextContainer color={colorScheme.theme}>Create</TextContainer>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
});
