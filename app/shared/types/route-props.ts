import {
  ICryptoAsset,
  IStockAsset,
  ICashAsset,
  IBankAsset,
  ICustomAsset,
  IRealEstateAsset,
} from 'shared/models';
import { ApiAssetType } from './api';

export type CreateAssetRouteProps = {
  type: ApiAssetType;
  name: string;
  id: number;
};
export type BuyScreenRouteProps =
  | 'crypto'
  | 'stock'
  | 'CURRENCY'
  | 'METAL'
  | 'TRANSFER';

export type MetalDetailScreenProps = 'gold' | 'silver';

export type CombinationAsset =
  | ICryptoAsset
  | ICashAsset
  | IStockAsset
  | IBankAsset
  | IRealEstateAsset
  | ICustomAsset;
