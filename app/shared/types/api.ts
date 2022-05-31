export type ApiAssetType =
  | 'bankSaving'
  | 'cash'
  | 'crypto'
  | 'custom'
  | 'realEstate'
  | 'stock'
  | 'fund';

export type TransactionType =
  | 'buyFromFund'
  | 'buyFromCash'
  | 'buyFromOutside'
  | 'withdrawToCash'
  | 'withdrawToOutside'
  | 'moveToFund'
  | 'addValue';

export type SellDataCallBack = {
  amount: number;
  fee: number;
  tax: number;
};
