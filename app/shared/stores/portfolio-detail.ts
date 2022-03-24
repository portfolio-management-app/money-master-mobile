import { BankAsset, RealEstateAsset } from './../models';
import { Config } from 'config';
import { HttpError } from 'errors/base';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { CreateOtherAssetBody } from './types';
import { UserStore } from './user';

export const PortfolioDetailStore = types
  .model({
    id: types.number,
    name: types.string,
    bankAssetList: types.array(BankAsset),
    realEstateAssetList: types.array(RealEstateAsset),
    loading: types.boolean,
  })
  .actions((self) => {
    const createOtherAsset = flow(function* (
      body: CreateOtherAssetBody,
      assetTypeId: number
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.id}/custom/${assetTypeId}`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        getAllAsset();
      }
    });

    const createBankAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.id}/bankSaving`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        getBankingAsset();
      }
    });

    const createRealEstateAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.id}/realEstate`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        getRealEstateAsset();
      }
    });

    const getAllAsset = flow(function* () {
      self.loading = true;
      yield Promise.all([getBankingAsset(), getRealEstateAsset()]);
      self.loading = false;
    });

    const getBankingAsset = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.id}/bankSaving`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        self.bankAssetList = res;
      }
    });

    const getRealEstateAsset = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.id}/realEstate`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        self.realEstateAssetList = res;
      }
    });

    const assignInfo = (id: number, name: string) => {
      self.id = id;
      self.name = name;
    };

    return {
      createOtherAsset,
      assignInfo,
      createBankAsset,
      createRealEstateAsset,
      getAllAsset,
    };
  })
  .create({
    id: 0,
    name: '',
    loading: false,
  });
