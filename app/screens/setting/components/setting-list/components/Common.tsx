import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon, TextContainer } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';

interface IProps {
  icon: JSX.Element;
  title: string;
  onPress?: () => void;
}

export const Common = ({ onPress, icon, title }: IProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styleProvider.container, styles.button]}
    >
      <View style={styleProvider.centerHorizontal}>
        {icon}
        <TextContainer ml={10}>{title}</TextContainer>
      </View>
      <Icon.Evil name="chevron-right" color={colorScheme.black200} size={35} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: colorScheme.gray400,
  },
});
