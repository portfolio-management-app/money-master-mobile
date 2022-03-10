import React from 'react';
import { BottomSheet, TextContainer } from 'shared/components';

interface IProps {
  open: boolean;
  onClose: () => void;
}

export const DetailModal = ({ open, onClose }: IProps) => {
  return (
    <BottomSheet onClose={onClose} open={open}>
      <TextContainer>Test</TextContainer>
    </BottomSheet>
  );
};
