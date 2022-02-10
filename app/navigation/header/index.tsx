import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { PlatformView, TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  title?: string;
  rightIcon?: never;
}

export const NavigationHeader = ({ title, rightIcon }: IProps) => {
  const navigation = useNavigation();
  return (
    <PlatformView style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.leftButton}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="chevron-left"
          type="entypo"
          size={30}
          tvParallaxProperties={{}}
          color={colorScheme.gray600}
        ></Icon>
      </TouchableOpacity>

      <TextContainer style={{ fontWeight: 'bold' }} type="h4">
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
    backgroundColor: colorScheme.white,
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
