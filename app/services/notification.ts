import { Platform } from 'react-native';
import { Notifications, RegistrationError } from 'react-native-notifications';

Notifications.events().registerRemoteNotificationsRegistrationFailed(
  (event: RegistrationError) => {
    console.error(event);
  }
);
Notifications.events().registerNotificationReceivedForeground(
  (notification, completion) => {
    if (Platform.OS === 'android') {
      Notifications.postLocalNotification(notification.payload);
    }

    // Calling completion on iOS with `alert: true` will present the native iOS inApp notification.
    completion({ alert: true, sound: true, badge: false });
  }
);
Notifications.events().registerNotificationOpened(
  (notification, completion: () => void, action) => {
    console.log('Notification opened by device user', notification.payload);
    console.log(
      `Notification opened with an action identifier: ${action?.identifier} and response text: ${action?.text}`
    );
    completion();
  }
);

export { Notifications as NotificationService };
