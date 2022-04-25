import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  IBankAsset,
  ICryptoAsset,
  ICustomAsset,
  IRealEstateAsset,
  IStockAsset,
} from 'shared/models';
import {
  BuyScreenRouteProps,
  CreateAssetRouteProps,
  MetalDetailScreenProps,
} from 'shared/types';
import type { StackScreenProps } from '@react-navigation/stack';

export type RootStackParamList = {
  Start: undefined;
  Home: undefined;
  Login: undefined;
  Register: undefined;
  ForgetPassword: undefined;
  PortfolioDetail: { id: number; name: string };
  BankAssetDetail: { info: IBankAsset };
  RealEstateAssetDetail: { info: IRealEstateAsset };
  CoinAssetDetail: { info: ICryptoAsset };
  StockAssetDetail: { info: IStockAsset };
  CustomAssetDetail: { info: ICustomAsset };
  CurrencyAssetDetail: undefined;
  AssetTypePicker: undefined;
  CreateAsset: { props: CreateAssetRouteProps };
  StockDetail: { symbol: string };
  CoinDetail: { id: string; name: string; currency: string };
  CurrencyDetail: undefined;
  MetalDetail: { type: MetalDetailScreenProps };
  PortfolioPicker: {
    type: BuyScreenRouteProps;
    metalType?: 'gold' | 'silver';
  };
  BuyCrypto: undefined;
  BuyStock: undefined;
  BuyCurrency: undefined;
  BuyGold: undefined;
  BuySilver: undefined;
  CryptoTransfer: { info: ICryptoAsset };
  StockTransfer: { info: IStockAsset };
  CustomTransfer: { info: ICustomAsset };
  BankTransfer: { info: IBankAsset };
  RealEstateTransfer: { info: IRealEstateAsset };
};

export type BottomStackParamStack = {
  MarketCap: undefined;
  PortfolioList: undefined;
  Setting: undefined;
  Dashboard: undefined;
};

export type RootStackScreenProps<T extends keyof RootStackParamList> =
  StackScreenProps<RootStackParamList, T>;

export type MainStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
