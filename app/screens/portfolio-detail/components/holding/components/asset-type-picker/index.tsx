import React from 'react';
import { StyleSheet } from 'react-native';
import { Modal, TouchableOpacity } from 'react-native-ui-lib';
import { SCREEN_CONTENT } from 'screens/portfolio-detail/constants';
import { CreateModalHeader, TextContainer } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { CreateOtherModal } from '../create-other-modal';
import { CryptoModal } from '../crypto-modal';
import { StockModal } from '../stock-modal';
import { ITEMS } from './item';

interface IProps {
  show: boolean;
  onClose: () => void;
}

type ShowState = {
  crypto: boolean;
  stock: boolean;
  banking: boolean;
  cash: boolean;
  realEaster: boolean;
  other: boolean;
};

const PICKER_CONTENT = SCREEN_CONTENT.assetPicker;

const Component = ({ show, onClose }: IProps) => {
  const [showModal, setShowModal] = React.useState<ShowState>({
    crypto: false,
    cash: false,
    other: false,
    stock: false,
    banking: false,
    realEaster: false,
  });

  const toggle = React.useCallback((id: number) => {
    switch (id) {
      case 0:
        setShowModal((prev) => {
          return { ...prev, crypto: !prev.crypto };
        });
        break;
      case 1:
        setShowModal((prev) => {
          return { ...prev, stock: !prev.stock };
        });
        break;
      case 2:
        setShowModal((prev) => {
          return { ...prev, banking: !prev.banking };
        });
        break;
      case 3:
        setShowModal((prev) => {
          return { ...prev, realEaster: !prev.realEaster };
        });
        break;
      case 4:
        setShowModal((prev) => {
          return { ...prev, cash: !prev.cash };
        });
        break;
      case 5:
        setShowModal((prev) => {
          return { ...prev, other: !prev.other };
        });
        break;
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
          onPress={() => toggle(item.id)}
          style={styles.card}
          key={item.id}
        >
          {item.icon}
          <TextContainer style={{ marginLeft: 20 }}>{item.label}</TextContainer>
        </TouchableOpacity>
      ))}
      <CreateOtherModal show={showModal.other} onClose={() => toggle(5)} />
      <CryptoModal show={showModal.crypto} onClose={() => toggle(0)} />
      <StockModal show={showModal.stock} onClose={() => toggle(1)} />
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
