import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { PlatformView, TextContainer } from 'shared/components';
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
  headerStyle = 'dark',
  bgColor = colorScheme.white,
}: IProps) => {
  const navigation = useNavigation();
  let iconColor = colorScheme.black200;
  if (headerStyle === 'light') {
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
        <Icon
          name="chevron-left"
          type="entypo"
          size={30}
          tvParallaxProperties={{}}
          color={iconColor}
        ></Icon>
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
    justifyContent: 'center',
    position: 'relative',
    paddingVertical: 10,
    paddingBottom: 20,
  },
  leftButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 30,
    height: 30,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
