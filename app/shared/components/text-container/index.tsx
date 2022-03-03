import React from 'react';
import { Text } from 'react-native';
import { colorScheme, fontProvider } from 'shared/styles';
import { TextContainerProps } from 'shared/types';

export const TextContainer = (props: TextContainerProps) => {
  const { style, children, bold, semiBold, color, type, light, ...res } = props;

  return (
    <Text
      style={[
        style,
        {
          fontSize: getFontSize(type),
          color: getColor(color, light),
          fontWeight: getFontWeight(bold, semiBold),
          fontFamily: fontProvider.openSans,
        },
      ]}
      {...res}
    >
      {children}
    </Text>
  );
};

const getFontWeight = (bold?: boolean, semiBold?: boolean) => {
  if (bold) {
    return 'bold';
  }
  if (semiBold) {
    return '600';
  }
  return 'normal';
};

const getColor = (color?: string, light?: boolean) => {
  if (light) {
    return colorScheme.white;
  }
  if (color) {
    return color;
  }

  return colorScheme.black200;
};

const getFontSize = (type?: TextContainerProps['type']) => {
  switch (type) {
    case 'h1':
      return 28;
    case 'h2':
      return 22;
    case 'h3':
      return 20;
    case 'h4':
      return 18;
    case 'small':
      return 14;
    case 'extra-small':
      return 12;
    case 'xxx-small':
      return 10;
    default:
      return 16;
  }
};
