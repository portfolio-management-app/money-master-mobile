import React from 'react';
import { Text } from 'react-native';
import { colorScheme, fontProvider } from 'shared/styles';
import { TextContainerProps } from 'shared/types';

export const TextContainer = (props: TextContainerProps) => {
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
    textAl,
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
          textAlign: textAl,
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
