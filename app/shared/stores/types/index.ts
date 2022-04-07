export type CreateOtherAssetBody = {
  name: string;
  inputDay: string;
  inputMoneyAmount: number;
  inputCurrency: string;
  description: string;
  interestRate: number;
  termRange: number;
};

export type AuthenResponse = {
  email: string;
  token: string;
};

export type CryptoAssetBody = {
  name: string;
  inputDay: string;
  currentAmountHolding: number;
  description: string;
  cryptoCoinCode: string;
};
