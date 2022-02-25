import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { styleProvider } from 'shared/styles';
import { CreateForm } from './components';

interface IProps {
  show: boolean;
  onClose: () => void;
}

const Component = ({ show, onClose }: IProps) => {
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
