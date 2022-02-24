import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { CreateModalHeader, FloatingButton, Icon } from 'shared/components';
import { colorScheme, styleProvider } from 'shared/styles';
import { CreateForm } from './components';

export const CreateModal = () => {
  const [showModal, setShowModal] = React.useState(false);

  const toggle = () => {
    setShowModal(!showModal);
  };
  return (
    <>
      <FloatingButton onPress={toggle} placement="bottom-right">
        <Icon.Material color={colorScheme.white} size={25} name="add" />
      </FloatingButton>
      <Modal
        animationType="slide"
        style={styleProvider.container}
        visible={showModal}
      >
        <CreateModalHeader onClose={toggle} title="New portfolio" />

        <CreateForm />
      </Modal>
    </>
  );
};
