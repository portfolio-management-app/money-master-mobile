import React from 'react';
import { HomeBottomTab } from 'navigation/bottom-tabs';
import { Registered } from 'react-native-notifications';
import { CryptoAssetStore, StockAssetStore, UserStore } from 'shared/stores';
import { NotificationService } from 'services/notification';
import { handleNotificationPress } from './helper';
import { useNavigation } from '@react-navigation/native';
import { MainStackNavigationProp } from 'navigation/types';
import { ApiAssetType } from 'shared/types';

export const Home = () => {
  const navigation = useNavigation<MainStackNavigationProp>();
  React.useEffect(() => {
    NotificationService.registerRemoteNotifications();
    NotificationService.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        UserStore.registerDeviceToken(event.deviceToken);
      }
    );
  }, []);
  NotificationService.events().registerNotificationOpened(
    async (notification, completion: () => void, action) => {
      console.log('Notification opened by device user', notification);
      console.log(
        `Notification opened with an action identifier: ${action?.identifier} and response text: ${action?.text}`
      );
      const result = await handleNotificationPress(notification.payload);
      handleNavigationFromNotification(result);
      completion();
    }
  );

  const handleNavigationFromNotification = (assetType: ApiAssetType | null) => {
    if (assetType === null) {
      return;
    }
    switch (assetType) {
      case 'crypto':
        navigation.navigate('CoinAssetDetail', {
          info: CryptoAssetStore.information,
        });
        break;
      case 'stock':
        navigation.navigate('StockAssetDetail', {
          info: StockAssetStore.information,
        });
        break;
    }
  };
  return (
    <>
      <HomeBottomTab />
    </>
  );
};
