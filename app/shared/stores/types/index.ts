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
};

export type CreateCurrencyAssetBody = {
  currencyCode: string;
  amount: number;
  name: string;
  inputDay: string;
  description: string;
  isUsingInvestFund: boolean;
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
};
export type TransferToInvestFundBody = {
  referentialAssetId: number;
  referentialAssetType: ApiAssetType;
  amount: number;
  currencyCode: string;
  isTransferringAll: boolean;
};

export type TransferToOtherAssetBody = {
  destinationAssetId: number;
  destinationAssetType: ApiAssetType;
  amount: number;
  currencyCode: string;
  isTransferringAll: boolean;
  transactionType: TransactionType;
};
