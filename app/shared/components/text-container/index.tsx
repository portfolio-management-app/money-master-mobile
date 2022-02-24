import React from 'react';
import { Text, TextProps } from 'react-native';
import { colorScheme, fontProvider } from 'shared/styles';

interface IProps extends TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'small' | 'extra-small' | 'xxx-small';
  light?: boolean;
  bold?: boolean;
  semiBold?: boolean;
  color?: string;
}

export const TextContainer = (props: IProps) => {
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

const getFontSize = (type?: IProps['type']) => {
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
