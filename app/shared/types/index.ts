import { RouteProp } from '@react-navigation/native';
import { HttpError } from 'errors/base';
import { TextProps, TextStyle, ViewStyle } from 'react-native';

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
  mb?: number;
  mt?: number;
  ml?: number;
  mr?: number;
  textAl?: TextStyle['textAlign'];
}
export interface ScreenParams extends RouteProp<any, any> {
  params: any;
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

export type AssetType =
  | 'OTHER'
  | 'CRYPTO'
  | 'STOCK'
  | 'REAL-ESTATE'
  | 'CASH'
  | 'GOLD'
  | 'BANKING';

export type CreateAssetRouteProps = {
  type: AssetType;
  name: string;
  id: number;
};

export type StockTimeSupport = '1' | '5' | '15' | '30' | '60' | 'D' | 'W' | 'M';

export type CryptoTimeSupport = 1 | 7 | 30 | 365;

export type CurrencyTimeSupport = '1h' | '1d' | '1w' | '1m';

export type AssetActionType = 'edit' | 'delete';
