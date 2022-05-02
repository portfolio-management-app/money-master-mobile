import React from 'react';
import { Dialog, PanningProvider } from 'react-native-ui-lib';
import { colorScheme, dimensionProvider } from 'shared/styles';
import { TextContainer } from '../TextContainer';

interface IProps {
  show: boolean;
  onClose?: () => void;
}

export const DrawAssetSheet = ({ show, onClose }: IProps) => {
  return (
    <Dialog
      useSafeArea
      width={dimensionProvider.width}
      visible={show}
      onDismiss={onClose}
      bottom
      containerStyle={{ backgroundColor: colorScheme.white }}
      panDirection={PanningProvider.Directions.DOWN}
    >
      <TextContainer>Test</TextContainer>
    </Dialog>
  );
};
