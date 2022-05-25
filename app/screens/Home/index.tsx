import React from 'react';
import { HomeBottomTab } from 'navigation/bottom-tabs';
import { Registered } from 'react-native-notifications';
import { UserStore } from 'shared/stores';
import { NotificationService } from 'services/notification';

export const Home = () => {
  React.useEffect(() => {
    NotificationService.registerRemoteNotifications();
    NotificationService.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        UserStore.registerDeviceToken(event.deviceToken);
      }
    );
  }, []);
  return (
    <>
      <HomeBottomTab />
    </>
  );
};
