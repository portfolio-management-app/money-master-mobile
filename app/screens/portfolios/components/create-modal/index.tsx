import React from 'react';
import { Modal } from 'react-native-ui-lib';
import { FloatingButton, Icon } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme, styleProvider } from 'shared/styles';
import { CreateForm } from './components';

export const SCREEN_CONTENT = APP_CONTENT.portfolioCreateModal;

export const CreateModal = () => {
  const [showModal, setShowModal] = React.useState(false);

  const toggle = () => {
    setShowModal(!showModal);
  };

  const onCreate = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <FloatingButton onPress={toggle} placement="bottom-right">
        <Icon.Material color={colorScheme.white} size={25} name="add" />
      </FloatingButton>
      <Modal
        onRequestClose={toggle}
        animationType="fade"
        style={styleProvider.container}
        visible={showModal}
      >
        <CreateForm onSubmit={onCreate} onClose={toggle} />
      </Modal>
    </>
  );
};
