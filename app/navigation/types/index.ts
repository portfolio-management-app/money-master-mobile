import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import {
  IBankAsset,
  ICryptoAsset,
  ICashAsset,
  ICustomAsset,
  IPortfolio,
  IRealEstateAsset,
  IStockAsset,
} from 'shared/models';
import {
  ApiAssetType,
  CombinationAsset,
  CreateAssetRouteProps,
  MetalDetailScreenProps,
  TransactionType,
} from 'shared/types';
import type { StackScreenProps } from '@react-navigation/stack';

type FromScreen = 'MARKET_CAP' | 'CREATE_NEW' | 'ASSET_DETAIL';

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
  CurrencyAssetDetail: { info: ICashAsset };
  AssetTypePicker: undefined;
  CreateAsset: {
    props: CreateAssetRouteProps;
    transactionType: TransactionType;
  };
  StockDetail: { symbol: string };
  CoinDetail: { id: string; name: string; currency: string };
  CurrencyDetail: undefined;
  MetalDetail: { type: MetalDetailScreenProps };
  PortfolioPicker: {
    type: ApiAssetType;
    metalType?: 'gold' | 'silver';
    actionType: 'BUY' | 'SELL';
  };
  BuyCrypto: { transactionType: TransactionType };
  BuyStock: { transactionType: TransactionType };
  BuyCash: { transactionType: TransactionType };
  SellCrypto: { transactionType: TransactionType };
  SellStock: { transactionType: TransactionType };
  SellCurrency: { transactionType: TransactionType };
  CashAssetPicker: {
    actionType: 'BUY' | 'SELL';
    type: ApiAssetType;
    source: CombinationAsset | undefined;
    transactionType: TransactionType;
    customAssetInfo?: { name: string; id: number };
    fromScreen: FromScreen;
  };
  CryptoTransfer: { info: ICryptoAsset };
  StockTransfer: { info: IStockAsset };
  CustomTransfer: { info: ICustomAsset };
  BankTransfer: { info: IBankAsset };
  CurrencyTransfer: { info: ICashAsset };
  RealEstateTransfer: { info: IRealEstateAsset };
  CryptoSellToCash: { source: ICryptoAsset; cashDestination: ICashAsset };
  StockSellToCash: { source: IStockAsset; cashDestination: ICashAsset };
  CashSellToCash: { source: ICashAsset; cashDestination: ICashAsset };
  BankSellToCash: { source: IBankAsset; cashDestination: ICashAsset };
  RealEstateSellToCash: {
    source: IRealEstateAsset;
    cashDestination: ICashAsset;
  };
  CustomSellToCash: { source: ICustomAsset; cashDestination: ICashAsset };
  EditPortfolio: {
    portfolio: IPortfolio;
    editFrom: 'PortfolioList' | 'PortfolioDetail';
  };
  NotificationSetting: {
    asset: CombinationAsset;
    type: ApiAssetType;
  };
  ChooseBuySource: {
    type: ApiAssetType;
    customAssetInfo?: { name: string; id: number };
    asset?: CombinationAsset;
    fromScreen: FromScreen;
  };
  UserNotification: undefined;
  DrawCrypto: { source: ICryptoAsset };
  DrawStock: { source: IStockAsset };
  DrawCash: { source: ICashAsset };
  DrawBank: { source: IBankAsset };
  DrawRealEstate: {
    source: IRealEstateAsset;
  };
  DrawCustom: { source: ICustomAsset };
  AddCryptoAsset: { source: ICryptoAsset };
  AddStockAsset: { source: IStockAsset };
  AddCustomAsset: { source: ICustomAsset };
  AddBankAsset: { source: IBankAsset };
  AddRealEstateAsset: { source: IRealEstateAsset };
  AddCashAsset: { source: ICashAsset };
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
