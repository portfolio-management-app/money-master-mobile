import React from 'react';
import { PortfolioDetailStore } from 'shared/stores';
import { CreateOtherAssetBody } from 'shared/stores/types';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

interface IProps extends ModalProps {
  id: number;
}

const Component = ({ onClose, header, id }: IProps) => {
  const onCreate = React.useCallback(
    (data: CreateOtherAssetBody) => {
      PortfolioDetailStore.createOtherAsset(data, id);
    },
    [id]
  );
  return <CreateForm header={header} onSubmit={onCreate} onClose={onClose} />;
};

export const Other = React.memo(Component);
