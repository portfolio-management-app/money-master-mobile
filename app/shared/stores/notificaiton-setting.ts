import { Config } from 'config';
import { httpRequest } from 'services/http';
import { flow, types } from 'mobx-state-tree';
import { NotificationSetting } from 'shared/models';
import { ApiAssetType } from 'shared/types';
import { UserStore } from './user';
import { HttpError } from 'errors/base';
import { log } from 'services/log';
import { EditNotificationBody, RegisterAssetNotificationBody } from './types';

export const NotificationSettingStore = types
  .model('NotificationSettingStore', {
    setting: NotificationSetting,
    loading: types.boolean,
    portfolioId: types.number,
  })
  .actions((self) => {
    const getSetting = flow(function* (
      assetId: number,
      portfolioId: number,
      assetType: ApiAssetType
    ) {
      self.loading = true;
      self.portfolioId = portfolioId;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${portfolioId}/notification/asset/${assetId}?assetType=${assetType}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get notification setting', res);
        self.setting = {
          assetId: 0,
          assetName: '',
          assetType: 'bankSaving',
          isHighOn: false,
          isLowOn: false,
          highThreadHoldAmount: 0,
          lowThreadHoldAmount: 0,
          currency: '',
          portfolioId: 0,
          coinCode: '',
          stockCode: '',
          id: 0,
        };
        self.loading = false;
      } else {
        self.setting = res;
        self.loading = false;
      }
    });

    const registerPriceNotification = flow(function* (
      body: RegisterAssetNotificationBody
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/notification`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when register notification', res);
      } else {
        log('Register notification success', res);
        self.setting = res;
      }
    });

    const editSetting = flow(function* (body: EditNotificationBody) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/notification/${self.setting.id}`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when edit notification setting', res);
      } else {
        log('Change notification setting success', res);
        self.setting = res;
      }
    });

    return { getSetting, registerPriceNotification, editSetting };
  })
  .create({
    setting: {
      assetId: 0,
      assetName: '',
      assetType: 'bankSaving',
      isHighOn: false,
      isLowOn: false,
      highThreadHoldAmount: 0,
      lowThreadHoldAmount: 0,
      currency: '',
      portfolioId: 0,
      coinCode: '',
      stockCode: '',
      id: 0,
    },
    portfolioId: 0,
    loading: false,
  });
