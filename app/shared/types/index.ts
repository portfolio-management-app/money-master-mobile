import { HttpError } from 'errors/base';
import {
  ModalProps,
  TextContainerProps,
  OnScrollProps,
  RadioPickerProps,
  ErrorBounderProps,
  Variant,
} from './component-props';
import {
  StockTimeSupport,
  CryptoTimeSupport,
  CurrencyTimeSupport,
} from './market-cap';
import {
  CreateAssetRouteProps,
  BuyScreenRouteProps,
  MetalDetailScreenProps,
} from './route-props';

export type {
  ModalProps,
  TextContainerProps,
  OnScrollProps,
  RadioPickerProps,
  ErrorBounderProps,
  Variant,
  StockTimeSupport,
  CryptoTimeSupport,
  CurrencyTimeSupport,
  CreateAssetRouteProps,
  BuyScreenRouteProps,
  MetalDetailScreenProps,
};

export type HttpRequestResponse = {
  isError: boolean;
  response: HttpError | any;
};

export type AssetActionType = 'edit' | 'delete';
