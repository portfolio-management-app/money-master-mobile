import React from 'react';
import { PortfolioDetailStore } from 'shared/stores';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

const Component = ({ onClose }: ModalProps) => {
  const onCreate = React.useCallback((data: any) => {
    PortfolioDetailStore.createRealEstateAsset(data);
  }, []);
  return <CreateForm onSubmit={onCreate} onClose={onClose} />;
};

export const RealEstate = React.memo(Component);
