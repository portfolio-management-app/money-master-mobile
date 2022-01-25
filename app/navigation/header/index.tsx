import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { PlatformView, TextContainer } from 'components';
import { Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

interface IProps {
  title?: string;
  rightIcon?: any;
}

export const NavigationHeader = ({ title, rightIcon }: IProps) => {
  const navigation = useNavigation();
  return (
    <PlatformView style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.headerContainer}
        onPress={() => navigation.goBack()}
      >
        <Icon
          name="chevron-left"
          type="entypo"
          size={30}
          tvParallaxProperties={undefined}
        ></Icon>
        <TextContainer type="h4">{title ? title : ''}</TextContainer>
      </TouchableOpacity>
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
