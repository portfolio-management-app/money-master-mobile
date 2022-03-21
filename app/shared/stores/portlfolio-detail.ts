import { Config } from 'config';
import { HttpError } from 'errors/base';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { CreateOtherAssetBody } from './types';
import { UserStore } from './user';

export const PortfolioDetailStore = types
  .model('PortfolioDetailStore', {
    id: types.number,
  })
  .actions((self) => {
    const createOtherAsset = flow(function* (body: CreateOtherAssetBody) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.id}/custom/{customInfoId}`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      }
    });

    return { createOtherAsset };
  })
  .create({
    id: 1,
  });
