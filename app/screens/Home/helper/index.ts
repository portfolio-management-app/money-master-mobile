import { UserNotificationStore } from 'shared/stores';
import { fetchAssetData } from 'utils/api';

export async function handleNotificationPress(message: any) {
  switch (message['type']) {
    case 'assetReachValueHigh':
    case 'assetReachValueLow': {
      const type = await fetchAssetData(
        parseInt(message['assetId']),
        parseInt(message['portfolioId']),
        message['assetType']
      );
      UserNotificationStore.getNotificationList();
      return type;
    }
  }
  return null;
}
