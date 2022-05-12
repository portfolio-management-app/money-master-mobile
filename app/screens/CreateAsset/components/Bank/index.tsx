import React from 'react';
import { PortfolioDetailStore } from 'shared/stores';
import { CreateBankAssetBody } from 'shared/stores/types';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

const Component = ({ onClose }: ModalProps) => {
  const onCreate = React.useCallback((data: CreateBankAssetBody) => {
    PortfolioDetailStore.createBankAsset(data);
  }, []);
  return <CreateForm onSubmit={onCreate} onClose={onClose} />;
};

export const Bank = React.memo(Component);
