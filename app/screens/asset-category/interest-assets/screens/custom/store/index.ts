import { HttpError } from 'errors/base';
import { types, flow, cast } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { log } from 'services/log-service';
import { UserStore } from 'shared/stores';

const CustomAsset = types.model('CustomAsset', {
  name: types.string,
  inputDay: types.string,
  inputMoneyAmount: types.number,
  inputCurrency: types.string,
  description: types.string,
  interestRate: types.number,
  termRange: types.number,
});

export type RequestDataType = {
  name: string;
  inputDay: Date;
  inputMoneyAmount: number;
  inputCurrency: string;
  description: string;
  interestRate: number;
  termRange: number;
};

export const CustomAssetStore = types
  .model('CustomAssetStore', {
    assetList: types.array(CustomAsset),
  })
  .actions((self) => {
    const getAssetList = flow(function* (id: number) {
      const res = yield httpRequest.sendGet(
        `/personalAsset/interest/custom/${id}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error get asset list', res);
      } else {
        self.assetList = cast(res);
      }
    });

    const createNewAsset = flow(function* (id: number, body: RequestDataType) {
      const res = yield httpRequest.sendPost(
        `/personalAsset/interest/custom/${id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error get asset list', res);
      } else {
        yield getAssetList(id);
      }
    });

    return { getAssetList, createNewAsset };
  })
  .create({
    assetList: [],
  });
