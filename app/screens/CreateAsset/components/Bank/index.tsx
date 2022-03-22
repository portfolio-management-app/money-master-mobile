import React from 'react';
import { PortfolioDetailStore } from 'shared/stores';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

const Component = ({ onClose }: ModalProps) => {
  const onCreate = React.useCallback((data: any) => {
    PortfolioDetailStore.createBankAsset(data);
  }, []);
  return <CreateForm onSubmit={onCreate} onClose={onClose} />;
};

export const Bank = React.memo(Component);
