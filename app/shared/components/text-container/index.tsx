import React from 'react';
import { Text, TextProps } from 'react-native';
import { colorScheme, fontProvider } from 'shared/styles';

interface IProps extends TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'small' | 'extra-small' | 'xxx-small';
  light?: boolean;
  bold?: boolean;
  semiBold?: boolean;
  color?: string;
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
}

export const TextContainer = (props: IProps) => {
  const {
    style,
    children,
    bold,
    semiBold,
    color,
    type,
    light,
    mb,
    ml,
    mr,
    mt,
    ...res
  } = props;

  return (
    <Text
      style={[
        {
          fontSize: getFontSize(type),
          color: getColor(color, light),
          fontWeight: getFontWeight(bold, semiBold),
          fontFamily: fontProvider.openSans,
          marginBottom: mb ? mb : undefined,
          marginLeft: ml ? ml : undefined,
          marginRight: mr ? mr : undefined,
          marginTop: mt ? mt : undefined,
        },
        style,
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
    return '700';
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
