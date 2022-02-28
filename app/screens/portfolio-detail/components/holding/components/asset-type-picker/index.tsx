import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, TouchableOpacity } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/portfolio-detail/constants';
import { CreateModalHeader, TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { CreateOtherModal } from '../create-other-modal';
import { ITEMS } from './item';

interface IProps {
  show: boolean;
  onClose: () => void;
}

const PICKER_CONTENT = SCREEN_CONTENT.assetPicker;

const Component = ({ show, onClose }: IProps) => {
  const [showCreateOther, setShowCreateOther] = React.useState(false);
  const toggle = () => {
    setShowCreateOther(!setShowCreateOther);
  };

  const onItemPress = React.useCallback((id: number) => {
    switch (id) {
      case 5:
        setShowCreateOther(true);
    }
  }, []);

  return (
    <Modal animationType="fade" onRequestClose={onClose} visible={show}>
      <CreateModalHeader
        onClose={onClose}
        title={PICKER_CONTENT.title}
        hasRightButton={false}
        bgColor={colorScheme.theme}
        headerStyle="light-content"
      />
      {ITEMS.map((item) => (
        <TouchableOpacity
          onPress={() => onItemPress(item.id)}
          style={styles.card}
          key={item.id}
        >
          {item.icon}
          <TextContainer style={{ marginLeft: 20 }}>{item.label}</TextContainer>
        </TouchableOpacity>
      ))}
      <CreateOtherModal show={showCreateOther} onClose={toggle} />
    </Modal>
  );
};

export const AssetTypePicker = React.memo(Component);

const styles = StyleSheet.create({
  card: {
    borderBottomWidth: 0.5,
    borderBottomColor: colorScheme.gray400,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
