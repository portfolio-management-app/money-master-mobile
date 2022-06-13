import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import { NavigationHeader } from 'navigation/header';
import { MainStackNavigationProp } from 'navigation/types';
import React from 'react';
import { FlatList, View } from 'react-native';
import { Empty, PlatformView, SkeletonLoadable } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IUserNotification } from 'shared/models';
import {
  CryptoAssetStore,
  StockAssetStore,
  UserNotificationStore,
} from 'shared/stores';
import { styleProvider } from 'shared/styles';
import { fetchCryptoAsset, fetchStockAsset } from 'utils/api';
import { NotificationItem, SkeletonNotification } from './components';

export const UserNotification = observer(() => {
  const {
    getNotificationList,
    notificationList,
    setNotificationIsRead,
    loading,
  } = UserNotificationStore;
  const navigation = useNavigation<MainStackNavigationProp>();
  React.useEffect(() => {
    getNotificationList();
  }, [getNotificationList]);

  const handleNotificationPress = React.useCallback(
    async (item: IUserNotification) => {
      if (!item.isRead) setNotificationIsRead(item.id);
      switch (item.assetType) {
        case 'crypto':
          await fetchCryptoAsset(item.assetId, item.portfolioId);
          navigation.navigate('CoinAssetDetail', {
            info: CryptoAssetStore.information,
          });
          break;
        case 'stock':
          await fetchStockAsset(item.assetId, item.portfolioId);
          navigation.navigate('StockAssetDetail', {
            info: StockAssetStore.information,
          });
          break;
      }
    },
    [navigation, setNotificationIsRead]
  );
  return (
    <PlatformView style={styleProvider.body}>
      <NavigationHeader title={APP_CONTENT.userNotification.title} />
      <SkeletonLoadable
        loading={loading}
        skeleton={<SkeletonNotification />}
        dataComponent={
          <FlatList
            data={notificationList}
            keyExtractor={(data) => data.id.toString()}
            renderItem={(data) => (
              <NotificationItem
                onPress={handleNotificationPress}
                item={data.item}
              />
            )}
          />
        }
        isDataEmpty={notificationList.length === 0}
        emptyComponent={
          <View style={styleProvider.flexCenter}>
            <Empty message={APP_CONTENT.userNotification.noNotification} />
          </View>
        }
      />
    </PlatformView>
  );
});
