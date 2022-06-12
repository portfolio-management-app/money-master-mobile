import { Config } from 'config';
import { HttpError } from 'errors/base';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { log } from 'services/log';
import { UserNotification } from 'shared/models';
import { UserStore } from './user';

export const UserNotificationStore = types
  .model('UserNotificationStore', {
    notificationList: types.array(UserNotification),
    loading: types.boolean,
  })
  .views((self) => ({
    getNotReadNotification() {
      let count = 0;
      self.notificationList.forEach((item) => {
        if (!item.isRead) {
          count++;
        }
      });
      return count;
    },
  }))
  .actions((self) => {
    const getNotificationList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/userNotification`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get notification list', res);
      } else {
        self.notificationList = res;
      }
      self.loading = false;
    });

    const setNotificationIsRead = flow(function* (id: number) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/userNotification`,
        { id: id },
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when set notification read', res);
      } else {
        log('Read notification', res);
        getNotificationList();
      }
    });

    return { getNotificationList, setNotificationIsRead };
  })
  .create({ loading: false });
