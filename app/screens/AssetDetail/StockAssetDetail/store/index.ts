import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { PortfolioDetailStore, UserStore } from 'shared/stores';

export const StockAssetDetailStore = types
  .model({
    id: types.number,
  })
  .actions((self) => {
    const editAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${PortfolioDetailStore.id}/realEstate/${self.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        console.log(res);
      }
    });
    const assignInfo = (id: number) => {
      self.id = id;
    };

    return { editAsset, assignInfo };
  })
  .create({
    id: 0,
  });
