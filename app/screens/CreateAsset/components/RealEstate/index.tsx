import React from 'react';
import { PortfolioDetailStore } from 'shared/stores';
import { CreateRealEstateAssetBody } from 'shared/stores/types';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

const Component = ({ onClose }: ModalProps) => {
  const onCreate = React.useCallback((data: CreateRealEstateAssetBody) => {
    PortfolioDetailStore.createRealEstateAsset(data);
  }, []);
  return <CreateForm onSubmit={onCreate} onClose={onClose} />;
};

export const RealEstate = React.memo(Component);
