import React from 'react';
import { BallIndicator } from 'react-native-indicators';
import { StyleSheet } from 'react-native';
import { PlatformView } from 'components';
import { colorScheme } from 'styles';

interface IProps {
  show: boolean;
}

export const Loading = ({ show }: IProps) => {
  if (show)
    return (
      <PlatformView style={styles.loadingContainer}>
        <BallIndicator color={colorScheme.white} />
      </PlatformView>
    );
  else return <></>;
};

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    backgroundColor: colorScheme.loading,
  },
});