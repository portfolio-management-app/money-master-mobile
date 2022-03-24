import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { PortfolioDetailStore, UserStore } from 'shared/stores';

export const BankAssetDetailStore = types
  .model({
    id: types.number,
  })
  .actions((self) => {
    const editBankAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${PortfolioDetailStore.id}/bankSaving/${self.id}`,
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

    return { editBankAsset, assignInfo };
  })
  .create({
    id: 0,
  });
