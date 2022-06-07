import { Config } from 'config';
import { HttpError } from 'errors/base';
import { httpRequest } from 'services/http';
import { log } from 'services/log';
import { UserStore, CryptoAssetStore, StockAssetStore } from 'shared/stores';
import { ApiAssetType } from 'shared/types';

export async function fetchAssetData(
  assetId: number,
  portfolioId: number,
  assetType: ApiAssetType
) {
  console.log(assetId, portfolioId, assetType);
  switch (assetType) {
    case 'crypto':
      await fetchCryptoAsset(assetId, portfolioId);
      return assetType;
    case 'stock':
      await fetchStockAsset(assetId, portfolioId);
      return assetType;
    default:
      return assetType;
  }
}

export async function fetchCryptoAsset(assetId: number, portfolioId: number) {
  const res = await httpRequest.sendGet(
    `${Config.BASE_URL}/portfolio/${portfolioId}/crypto/${assetId}`,
    UserStore.user.token
  );
  if (res instanceof HttpError) {
    log('Error when get asset from notification', res);
  } else {
    CryptoAssetStore.assignInfo(res);
  }
}

export async function fetchStockAsset(assetId: number, portfolioId: number) {
  const res = await httpRequest.sendGet(
    `${Config.BASE_URL}/portfolio/${portfolioId}/stock/${assetId}`,
    UserStore.user.token
  );
  if (res instanceof HttpError) {
    log('Error when get asset from notification', res);
  } else {
    StockAssetStore.assignInfo(res);
  }
}
