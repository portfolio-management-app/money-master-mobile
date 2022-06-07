import { ICryptoAsset, IStockAsset } from 'shared/models';
import { ApiAssetType, CombinationAsset } from 'shared/types';

export function getAssetCommonInfo(
  asset: CombinationAsset,
  assetType: ApiAssetType
) {
  switch (assetType) {
    case 'crypto': {
      const temp = asset as ICryptoAsset;
      return {
        name: temp.name,
        id: temp.id,
        currentPrice: temp.currentPrice,
        coinCode: temp.cryptoCoinCode,
        currencyCode: temp.currencyCode,
        stockCode: null,
      };
    }
    case 'stock': {
      const temp = asset as IStockAsset;
      return {
        name: temp.name,
        id: temp.id,
        currentPrice: temp.currentPrice,
        coinCode: null,
        stockCode: temp.stockCode,
        currencyCode: temp.currencyCode,
      };
    }
    default:
      return {
        name: '',
        id: 0,
        currentPrice: 0,
        coinCode: null,
        stockCode: null,
        currencyCode: '',
      };
  }
}

export function isGreater(basePrice: number, newPrice: number) {
  return basePrice > newPrice;
}
