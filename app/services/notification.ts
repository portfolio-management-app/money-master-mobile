import { Platform } from 'react-native';
import { Notifications, RegistrationError } from 'react-native-notifications';
import { translateNotificationMessage } from 'utils/translation';

Notifications.events().registerRemoteNotificationsRegistrationFailed(
  (event: RegistrationError) => {
    console.error(event);
  }
);
Notifications.events().registerNotificationReceivedForeground(
  (notification, completion) => {
    if (Platform.OS === 'android') {
      Notifications.postLocalNotification(
        translateNotificationMessage(notification.payload)
      );
    }

    // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
    completion({ alert: true, sound: true, badge: false });
  }
);

export { Notifications as NotificationService };
