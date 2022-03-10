import React from 'react';
import { Alert, Share } from 'react-native';
import { Icon } from 'shared/components';
import { colorScheme } from 'shared/styles';
import { ICON_SIZE, SCREEN_CONTENT } from '../../constant';
import { Common } from './Common';

export const ShareApp = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `${SCREEN_CONTENT.shareContent} https://install.appcenter.ms/orgs/Money-Master/apps/MoneyMasterAndroid/releases`,
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };
  return (
    <Common
      onPress={onShare}
      icon={
        <Icon.Material
          size={ICON_SIZE}
          color={colorScheme.black200}
          name="share"
        />
      }
      title={SCREEN_CONTENT.share}
    />
  );
};
