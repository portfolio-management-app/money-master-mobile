export type ApiAssetType =
  | 'bankSaving'
  | 'cash'
  | 'crypto'
  | 'custom'
  | 'realEstate'
  | 'stock'
  | 'fund';

export type TransactionType =
  | 'newAsset'
  | 'addValue'
  | 'withdrawValue'
  | 'sellAsset'
  | 'moveToFund';
