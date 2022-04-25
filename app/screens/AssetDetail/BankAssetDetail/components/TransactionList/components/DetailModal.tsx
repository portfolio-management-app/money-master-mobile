import React from 'react';
import { BottomSheet, TextContainer } from 'shared/components';
import { ITransactionItem } from 'shared/models';

interface IProps {
  open: boolean;
  onClose: () => void;
  info?: ITransactionItem;
}

export const DetailModal = ({ open, onClose, info }: IProps) => {
  return (
    <BottomSheet onClose={onClose} open={open}>
      <TextContainer>{info?.createdAt}</TextContainer>
    </BottomSheet>
  );
};
