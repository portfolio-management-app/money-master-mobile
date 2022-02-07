import React from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { colorScheme } from 'styles';

interface IProps {
  placement?: 'bottom-left' | 'bottom-right' | 'top-left' | 'top-right';
  children: any;
  borderRadius?: number;
  size?: number;
  color?: string;
  mg?: number;
  onPress?: () => void;
}

export const FloatingButton = ({
  placement,
  children,
  color,
  borderRadius,
  size,
  mg,
  onPress,
}: IProps) => {
  const style = getStyle({
    color: color,
    borderRadius: borderRadius,
    mg: mg,
    placement: placement,
    size: size,
  });

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={style}>
      {children}
    </TouchableOpacity>
  );
};

const getStyle = ({
  color,
  borderRadius,
  mg,
  placement,
  size,
}: Partial<IProps>) => {
  const defaultColor = color ? color : colorScheme.theme;
  const radius = borderRadius ? borderRadius : 50;
  const defaultSize = size ? size : 50;
  const margin = mg ? mg : 20;

  let style: ViewStyle = {
    borderRadius: radius,
    backgroundColor: defaultColor,
    width: defaultSize,
    height: defaultSize,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    right: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  };
  switch (placement) {
    case 'bottom-left':
      {
        style = { ...style, bottom: margin, left: margin };
      }
      break;
    case 'bottom-right':
      {
        style = { ...style, bottom: margin, right: margin };
      }
      break;
    case 'top-left':
      {
        style = { ...style, top: margin, left: margin };
      }
      break;
    case 'top-right':
      {
        style = { ...style, top: margin, right: margin };
      }
      break;
    default: {
      style = { ...style, bottom: margin, right: margin };
    }
  }

  return style;
};
