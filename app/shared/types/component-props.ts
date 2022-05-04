import { HttpError } from 'errors/base';
import { TextProps, TextStyle, ViewStyle } from 'react-native';

export type ErrorBounderProps = {
  show: boolean;
  res: HttpError | null;
  onClose: () => void;
};

export type Variant = 'error' | 'success' | 'warning' | 'info';

export interface TextContainerProps extends TextProps {
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'small' | 'extra-small' | 'xxx-small';
  light?: boolean;
  bold?: boolean;
  semiBold?: boolean;
  color?: string;
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
  textAl?: TextStyle['textAlign'];
}

export type OnScrollProps = {
  onScroll: (e: any) => void;
};

export type ModalProps = {
  show?: boolean;
  onClose: () => void;
  header?: string;
};

export interface RadioPickerProps {
  values: string[];
  title: string;
  onChange?: (value: string) => void;
  labelStyle?: TextStyle;
  containerStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  initValue?: string;
  titleStyle?: TextContainerProps;
  size?: number;
}

export interface HorizontalBarChartProps {
  data: Array<{
    value: number;
    label: string;
    percent: number;
    color: string;
  }>;
}

export interface IPieData {
  value: number;
  svg: {
    fill: string;
  };
  key: string;
  name: string;
}
