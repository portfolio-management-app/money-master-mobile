import React from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { colorScheme } from 'shared/styles';
import { TextContainer } from '../text-container';
import { Icon } from '../icon';

interface IProps {
  title: string;
  open: boolean;
  style?: ViewStyle;
}

export const AssetSectionHeader = ({ title, open, style }: IProps) => {
  return (
    <View style={[styles.section, style]}>
      <TextContainer semiBold>{title}</TextContainer>
      {open ? (
        <Icon.Evil color={colorScheme.black200} size={35} name="chevron-up" />
      ) : (
        <Icon.Evil color={colorScheme.black200} size={35} name="chevron-down" />
      )}
    </View>
  );
};

export const styles = StyleSheet.create({
  section: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
});
