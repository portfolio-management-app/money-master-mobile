import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  IBankAsset,
  ICryptoAsset,
  ICurrencyAsset,
  ICustomAsset,
  IPortfolio,
  IRealEstateAsset,
  IStockAsset,
} from 'shared/models';
import {
  AssetType,
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
  PortfolioDetail: { info: IPortfolio };
  BankAssetDetail: { info: IBankAsset };
  RealEstateAssetDetail: { info: IRealEstateAsset };
  CoinAssetDetail: { info: ICryptoAsset };
  StockAssetDetail: { info: IStockAsset };
  CustomAssetDetail: { info: ICustomAsset };
  CurrencyAssetDetail: { info: ICurrencyAsset };
  AssetTypePicker: undefined;
  CreateAsset: { props: CreateAssetRouteProps };
  StockDetail: { symbol: string };
  CoinDetail: { id: string; name: string; currency: string };
  CurrencyDetail: undefined;
  MetalDetail: { type: MetalDetailScreenProps };
  PortfolioPicker: {
    type: BuyScreenRouteProps;
    metalType?: 'gold' | 'silver';
    actionType: 'BUY' | 'SELL';
  };
  BuyCrypto: undefined;
  BuyStock: undefined;
  BuyCurrency: undefined;
  BuyGold: undefined;
  BuySilver: undefined;
  SellCrypto: undefined;
  SellStock: undefined;
  SellCurrency: undefined;
  CashAssetPicker: {
    type: AssetType;
    source:
      | ICryptoAsset
      | ICurrencyAsset
      | IStockAsset
      | IBankAsset
      | IRealEstateAsset
      | ICustomAsset;
  };
  CryptoTransfer: { info: ICryptoAsset };
  StockTransfer: { info: IStockAsset };
  CustomTransfer: { info: ICustomAsset };
  BankTransfer: { info: IBankAsset };
  CurrencyTransfer: { info: ICurrencyAsset };
  RealEstateTransfer: { info: IRealEstateAsset };
  DrawCrypto: { source: ICryptoAsset; cashDestination: ICurrencyAsset };
  DrawStock: { source: IStockAsset; cashDestination: ICurrencyAsset };
  DrawCash: { source: ICurrencyAsset; cashDestination: ICurrencyAsset };
  DrawBank: { source: IBankAsset; cashDestination: ICurrencyAsset };
  DrawRealEstate: { source: IRealEstateAsset; cashDestination: ICurrencyAsset };
  DrawOtherAsset: { source: ICustomAsset; cashDestination: ICurrencyAsset };
  EditPortfolio: {
    portfolio: IPortfolio;
    editFrom: 'PortfolioList' | 'PortfolioDetail';
  };
  NotificationSetting: {
    asset:
      | ICryptoAsset
      | ICurrencyAsset
      | IStockAsset
      | IBankAsset
      | IRealEstateAsset
      | ICustomAsset;
    type: AssetType;
  };
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
