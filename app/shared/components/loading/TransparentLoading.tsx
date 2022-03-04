import React from 'react';
import { StyleSheet } from 'react-native';
import { SkypeIndicator } from 'react-native-indicators';
import { View } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';

interface IProps {
  show: boolean;
}

export const TransparentLoading = ({ show }: IProps) => {
  return (
    <>
      {show ? (
        <View style={styles.container}>
          <SkypeIndicator color={colorScheme.theme} size={40} />
        </View>
      ) : (
        <></>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    zIndex: 2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
