import { TransactionType } from './../../types/api';
import { ApiAssetType } from 'shared/types';
export type CreateOtherAssetBody = {
  name: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  description: string;
  interestRate: number;
  termRange: number;
  isUsingInvestFund: boolean;
  isUsingCash: boolean;
  usingCashId: number;
  fee: number;
  tax: number;
};

export type AuthenResponse = {
  email: string;
  token: string;
};

export type CreateCryptoAssetBody = {
  name: string;
  inputDay: string;
  currentAmountHolding: number;
  description: string;
  purchasePrice: number;
  currencyCode: string;
  cryptoCoinCode: string;
  isUsingInvestFund: boolean;
  isUsingCash: boolean;
  usingCashId: number;
  fee: number;
  tax: number;
};

export type CreateStockAssetBody = {
  name: string;
  inputDay: string;
  description: string;
  currentAmountHolding: number;
  stockCode: string;
  marketCode: string;
  purchasePrice: number;
  currencyCode: string;
  isUsingInvestFund: boolean;
  isUsingCash: boolean;
  usingCashId: number;
  fee: number;
  tax: number;
};

export type CreateCurrencyAssetBody = {
  currencyCode: string;
  amount: number;
  name: string;
  inputDay: string;
  description: string;
  isUsingInvestFund: boolean;
  isUsingCash: boolean;
  usingCashId: number;
  fee: number;
  tax: number;
};

export type CreateBankAssetBody = {
  name: string;
  bankCode: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  isGoingToReinState: boolean;
  description: string;
  interestRate: number;
  termRange: number;
  isUsingInvestFund: boolean;
  isUsingCash: boolean;
  usingCashId: number;
  fee: number;
  tax: number;
};

export type CreateRealEstateAssetBody = {
  name: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  buyPrice: number;
  currentPrice: number;
  description: string;
  isUsingInvestFund: boolean;
  isUsingCash: boolean;
  usingCashId: number;
  fee: number;
  tax: number;
};
export type TransferToInvestFundBody = {
  referentialAssetId: number;
  referentialAssetType: ApiAssetType;
  amount: number;
  currencyCode: string;
  isTransferringAll: boolean;
};

export type CreateTransactionBody = {
  amount: number;
  amountInDestinationAssetUnit: number;
  currencyCode: string;
  transactionType: TransactionType;
  destinationAssetId: number | null;
  destinationAssetType: ApiAssetType | null;
  referentialAssetId: number | null;
  referentialAssetType: ApiAssetType | null;
  isTransferringAll: boolean;
  fee: number;
  tax: number;
  isUsingFundAsSource: boolean;
};

export type EditPortfolioBody = {
  newName: string;
  newCurrency: string;
};

export type RegisterAssetNotificationBody = {
  assetId: number;
  assetName: string;
  assetType: ApiAssetType;
  currency: string;
  coinCode: string | null;
  stockCode: string | null;
  highThreadHoldAmount: number;
  lowThreadHoldAmount: number;
  isHigh: boolean;
};

export type EditNotificationBody = {
  highThreadHoldAmount: number;
  lowThreadHoldAmount: number;
  isHighOn: boolean;
  isLowOn: boolean;
};
