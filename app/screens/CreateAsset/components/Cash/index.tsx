import React from 'react';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

const Component = ({ onClose }: ModalProps) => {
  const onCreate = React.useCallback((data: any) => {
    console.log(data);
  }, []);
  return <CreateForm onSubmit={onCreate} onClose={onClose} />;
};

export const Cash = React.memo(Component);
