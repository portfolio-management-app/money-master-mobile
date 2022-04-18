import React from 'react';
import { HomeBottomTab } from 'navigation/bottom-tabs';
import {
  Notification,
  Notifications,
  Registered,
  RegistrationError,
} from 'react-native-notifications';
import { NotificationActionResponse } from 'react-native-notifications/lib/dist/interfaces/NotificationActionResponse';

export const Home = () => {
  React.useEffect(() => {
    Notifications.registerRemoteNotifications();

    Notifications.events().registerRemoteNotificationsRegistered(
      (event: Registered) => {
        // TODO: Send the token to my server so it could send back push notifications...
        console.log('Device Token Received', event.deviceToken);
      }
    );
    Notifications.events().registerRemoteNotificationsRegistrationFailed(
      (event: RegistrationError) => {
        console.error(event);
      }
    );
  }, []);
  return (
    <>
      <HomeBottomTab />
    </>
  );
};
