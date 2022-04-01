import { RouteProp } from '@react-navigation/native';

export interface ScreenParams extends RouteProp<any, any> {
  params: any;
}

export type AssetType =
  | 'OTHER'
  | 'CRYPTO'
  | 'STOCK'
  | 'REAL-ESTATE'
  | 'CASH'
  | 'GOLD'
  | 'BANKING';

export type CreateAssetRouteProps = {
  type: AssetType;
  name: string;
  id: number;
};
export type BuyScreenRouteProps = {
  type: 'CRYPTO' | 'STOCK' | 'CURRENCY' | 'METAL';
};
