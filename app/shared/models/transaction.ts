import { types } from 'mobx-state-tree';

export const TransactionItem = types.model('TransactionItem', {
  singleAssetTransactionType: types.union(
    types.literal('buyFromFund'),
    types.literal('buyFromCash'),
    types.literal('buyFromOutside'),
    types.literal('withdrawToCash'),
    types.literal('withdrawToOutside'),
    types.literal('moveToFund'),
    types.literal('addValue')
  ),
  id: types.number,
  referentialAssetId: types.maybeNull(types.number),
  referentialAssetType: types.union(
    types.literal('crypto'),
    types.literal('stock'),
    types.literal('bankSaving'),
    types.literal('realEstate'),
    types.literal('custom'),
    types.literal('cash'),
    types.literal('fund'),
    types.null
  ),
  referentialAssetName: types.maybeNull(types.string),
  destinationAssetId: types.maybeNull(types.number),
  destinationAssetType: types.union(
    types.literal('crypto'),
    types.literal('stock'),
    types.literal('bankSaving'),
    types.literal('realEstate'),
    types.literal('custom'),
    types.literal('fund'),
    types.literal('cash'),
    types.null
  ),
  destinationAssetName: types.maybeNull(types.string),
  destinationAmount: types.number,
  destinationCurrency: types.string,
  amount: types.number,
  currencyCode: types.string,
  createdAt: types.string,
  lastChanged: types.string,
  fee: types.number,
  tax: types.number,
});

export const InvestFundTransactionItem = types.model(
  'InvestFundTransactionItem',
  {
    id: types.number,
    referentialAssetId: types.number,
    referentialAssetType: types.union(
      types.literal('crypto'),
      types.literal('stock'),
      types.literal('bankSaving'),
      types.literal('realEstate'),
      types.literal('custom'),
      types.literal('cash'),
      types.literal('fund')
    ),
    referentialAssetName: types.maybeNull(types.string),
    amount: types.number,
    currencyCode: types.string,
    createdAt: types.string,
    lastChanged: types.string,
    investFundId: types.number,
    isIngoing: types.boolean,
  }
);
