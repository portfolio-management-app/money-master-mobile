import { HttpError } from 'errors/base';
import { Config } from 'config';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { UserStore } from 'shared/stores';

const AssetType = types.model('AssetType', {
  id: types.number,
  name: types.string,
});

export const AssetTypeStore = types
  .model('AssetTypeStore', {
    assetTypeList: types.array(AssetType),
    loading: types.boolean,
  })
  .actions((self) => {
    const getAssetTypeList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/personalAsset/interest/custom`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        self.assetTypeList = res;
      }
      self.loading = false;
    });

    const addNewAssetType = flow(function* (name: string) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/personalAsset/interest/custom`,
        { name: name },
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        getAssetTypeList();
      }
    });
    return { getAssetTypeList, addNewAssetType };
  })
  .create({
    assetTypeList: [],
    loading: false,
  });
