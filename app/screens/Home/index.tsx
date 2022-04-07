import React from 'react';
import messaging from '@react-native-firebase/messaging';
import { requestUserPermission } from 'services/notification';
import { HomeBottomTab } from 'navigation/bottom-tabs';
import { Alert } from 'react-native';

export const Home = () => {
  React.useEffect(() => {
    requestUserPermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  return <HomeBottomTab />;
};
