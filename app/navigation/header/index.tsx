import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Icon, PlatformView, TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  title?: string;
  rightIcon?: never;
  headerStyle?: 'light' | 'dark';
  bgColor?: string;
}

export const NavigationHeader = ({
  title,
  rightIcon,
  headerStyle = 'light',
  bgColor = colorScheme.white,
}: IProps) => {
  const navigation = useNavigation();
  let iconColor = colorScheme.black200;
  if (headerStyle === 'dark') {
    iconColor = colorScheme.white;
  }
  return (
    <PlatformView
      style={[styles.headerContainer, { backgroundColor: bgColor }]}
    >
      <TouchableOpacity
        style={styles.leftButton}
        onPress={() => navigation.goBack()}
      >
        <Icon.Entypo name="chevron-left" size={35} color={iconColor} />
      </TouchableOpacity>

      <TextContainer style={{ fontWeight: 'bold', color: iconColor }} type="h4">
        {title ? title : ''}
      </TextContainer>
      {rightIcon && rightIcon}
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingVertical: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  leftButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
});
