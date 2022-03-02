import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { styleProvider } from 'shared/styles';
import { ModalProps } from 'shared/types';
import { CreateForm } from './components';

const Component = ({ show, onClose }: ModalProps) => {
  const onCreate = React.useCallback((data: any) => {
    console.log(data);
  }, []);
  return (
    <Modal
      onRequestClose={onClose}
      animationType="fade"
      style={styleProvider.container}
      visible={show}
    >
      <CreateForm onSubmit={onCreate} onClose={onClose} />
    </Modal>
  );
};

export const CreateOtherModal = React.memo(Component);
