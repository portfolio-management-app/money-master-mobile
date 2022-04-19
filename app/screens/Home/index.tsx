import React from 'react';
import { HomeBottomTab } from 'navigation/bottom-tabs';
import {
  Notifications,
  Registered,
  RegistrationError,
} from 'react-native-notifications';
import { Platform } from 'react-native';

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
    Notifications.events().registerNotificationReceivedForeground(
      (notif, completion) => {
        if (Platform.OS === 'android') {
          Notifications.postLocalNotification(notif.payload);
        }

        // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
        completion({ alert: true, sound: true, badge: false });
      }
    );
  }, []);
  return (
    <>
      <HomeBottomTab />
    </>
  );
};
