import React from 'react';
import { StyleSheet } from 'react-native';
import { Hint } from 'react-native-ui-lib';
import { colorScheme } from 'shared/styles';

interface IProps {
  message: string;
  children: JSX.Element;
  show: boolean;
  position?: 'top' | 'bottom';
  onBackgroundPress?: () => void;
  onPress?: () => void;
}

export const CustomHint = ({
  message,
  children,
  show,
  position = 'top',
  onBackgroundPress,
  onPress,
}: IProps) => {
  return (
    <Hint
      style={styles.hintContainer}
      position={position === 'top' ? Hint.positions.TOP : Hint.positions.BOTTOM}
      visible={show}
      onPress={onPress}
      message={message}
      color={colorScheme.hint}
      borderRadius={10}
      onBackgroundPress={onBackgroundPress}
    >
      {children}
    </Hint>
  );
};

const styles = StyleSheet.create({
  hintContainer: {
    backgroundColor: colorScheme.black200,
  },
});
