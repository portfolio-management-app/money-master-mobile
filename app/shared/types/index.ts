import { HttpError } from 'errors/base';
import { ApiAssetType, TransactionType, SellDataCallBack } from './api';
import {
  ModalProps,
  TextContainerProps,
  OnScrollProps,
  RadioPickerProps,
  ErrorBounderProps,
  Variant,
  HorizontalBarChartProps,
  IPieData,
  SceneRoute,
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
  CombinationAsset,
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
  ApiAssetType,
  TransactionType,
  HorizontalBarChartProps,
  IPieData,
  SceneRoute,
  SellDataCallBack,
  CombinationAsset,
};

export type HttpRequestResponse = {
  isError: boolean;
  response: HttpError | any;
};

export type AssetActionType = 'edit' | 'delete' | 'notification-setting';

export type NotificationType = 'assetReachValueHigh' | 'assetReachValueLow';
