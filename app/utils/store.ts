import {
  BankAssetStore,
  CashAssetStore,
  CryptoAssetStore,
  CustomAssetStore,
  RealEstateAssetStore,
  StockAssetStore,
} from 'shared/stores';

export const assignPortfolioIdToAssetStore = (id: number) => {
  BankAssetStore.assignPortfolioId(id);
  CryptoAssetStore.assignPortfolioId(id);
  StockAssetStore.assignPortfolioId(id);
  CustomAssetStore.assignPortfolioId(id);
  RealEstateAssetStore.assignPortfolioId(id);
  CashAssetStore.assignPortfolioId(id);
};
