import { HttpError } from 'errors/base';
import { TextProps } from 'react-native';
export type HttpRequestResponse = {
  isError: boolean;
  response: HttpError | any;
};

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
}
