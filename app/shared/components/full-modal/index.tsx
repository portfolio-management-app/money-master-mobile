import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Icon, Overlay } from 'react-native-elements';
import { colorScheme, iconProvider } from 'shared/styles';
import { TextContainer } from '../text-container';

interface IProps {
  show: boolean;
  onClose: () => void;
  children: JSX.Element;
  headerTitle: string;
}

const Header = ({ headerTitle, onClose }: Partial<IProps>) => {
  return (
    <View style={styles.modalHeader}>
      <TextContainer>{headerTitle}</TextContainer>
      <Icon
        onPress={onClose}
        tvParallaxProperties={{}}
        name="close"
        type={iconProvider.ionicon}
      />
    </View>
  );
};

export const FullModal = ({ show, onClose, children, headerTitle }: IProps) => {
  return (
    <Overlay style={styles.modal} isVisible={show}>
      <Header headerTitle={headerTitle} onClose={onClose} />
      {children}
    </Overlay>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: colorScheme.white,
  },
  modalHeader: {
    flexDirection: 'row',
  },
});
