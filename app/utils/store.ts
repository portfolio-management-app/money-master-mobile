import {
  BankAssetStore,
  CashAssetStore,
  CustomAssetStore,
  RealEstateAssetStore,
  StockAssetStore,
} from 'shared/stores';

export const assignPortfolioIdToAssetStore = (id: number) => {
  BankAssetStore.assignPortfolioId(id);
  StockAssetStore.assignPortfolioId(id);
  CustomAssetStore.assignPortfolioId(id);
  RealEstateAssetStore.assignPortfolioId(id);
  CashAssetStore.assignPortfolioId(id);
};
