import React from 'react';
import { StyleSheet, ViewStyle } from 'react-native';
import { Card, Incubator, View } from 'react-native-ui-lib';
import { APP_CONTENT } from 'shared/constants';
import { colorScheme } from 'shared/styles';
import { Variant } from 'shared/types';
import { Icon } from '../Icon';
import { TextContainer } from '../TextContainer';

interface IProps {
  message?: string;
  show: boolean;
  onDismiss?: () => void;
  variant?: Variant;
}

const TOAST_HEADER_CONTENT = APP_CONTENT.toastHeader;

const ICON_SIZE = 30;

export const CustomToast = ({
  message,
  show,
  onDismiss,
  variant = 'success',
}: IProps) => {
  const { style, toastHeader, icon } = React.useMemo(
    () => getUI(variant),
    [variant]
  );
  return (
    <Incubator.Toast
      onDismiss={onDismiss}
      visible={show}
      swipeable={true}
      autoDismiss={3000}
      position="top"
      zIndex={100}
    >
      <Card
        enableBlur
        elevation={10}
        enableShadow
        style={[styles.toast, style]}
      >
        <View style={styles.leftContainer}>
          {icon}
          <View style={{ marginLeft: 10 }}>
            <TextContainer bold>{toastHeader}</TextContainer>
            <TextContainer>{message}</TextContainer>
          </View>
        </View>

        <Icon.Evil onPress={onDismiss} name="close" size={30} />
      </Card>
    </Incubator.Toast>
  );
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: colorScheme.white,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingRight: 30,
    paddingLeft: 10,
    paddingVertical: 20,
    borderRadius: 0,
  },
  leftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const getUI = (variant: Variant) => {
  const style: ViewStyle = {
    borderLeftWidth: 6,
    borderLeftColor: colorScheme.green200,
  };
  let toastHeader = TOAST_HEADER_CONTENT.success;

  let icon = (
    <Icon.MaterialCommunity
      name="check-circle"
      size={ICON_SIZE}
      color={colorScheme.green200}
    />
  );

  switch (variant) {
    case 'error':
      {
        style.borderLeftColor = colorScheme.red500;
        toastHeader = TOAST_HEADER_CONTENT.error;
        icon = (
          <Icon.Material
            name="error"
            size={ICON_SIZE}
            color={colorScheme.red500}
          />
        );
      }
      break;
    case 'info':
      {
        style.borderLeftColor = colorScheme.blue300;
        toastHeader = TOAST_HEADER_CONTENT.info;
        icon = (
          <Icon.Material
            size={ICON_SIZE}
            name="info"
            color={colorScheme.black200}
          />
        );
      }
      break;
    case 'warning': {
      style.borderLeftColor = colorScheme.warning;
      toastHeader = TOAST_HEADER_CONTENT.warning;
      icon = (
        <Icon.Ioni
          size={ICON_SIZE}
          name="warning"
          color={colorScheme.warning}
        />
      );
    }
  }

  return { style, toastHeader, icon };
};
