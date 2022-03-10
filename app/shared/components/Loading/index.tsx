import React from 'react';
import { WaveIndicator } from 'react-native-indicators';
import { StyleSheet } from 'react-native';
import { PlatformView } from 'shared/components';
import { colorScheme } from 'shared/styles';

interface IProps {
  show: boolean;
}

export const Loading = ({ show }: IProps) => {
  if (show)
    return (
      <PlatformView style={styles.loadingContainer}>
        <WaveIndicator color={colorScheme.theme} size={50} />
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
