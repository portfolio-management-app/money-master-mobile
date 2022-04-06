export type AssetType =
  | 'OTHER'
  | 'CRYPTO'
  | 'STOCK'
  | 'REAL-ESTATE'
  | 'CASH'
  | 'METAL'
  | 'BANKING';

export type CreateAssetRouteProps = {
  type: AssetType;
  name: string;
  id: number;
};
export type BuyScreenRouteProps = 'CRYPTO' | 'STOCK' | 'CURRENCY' | 'METAL';

export type MetalDetailScreenProps = 'gold' | 'silver';
