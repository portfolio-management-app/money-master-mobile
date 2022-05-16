import { TransactionItem, Response } from 'shared/models';
import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import { log } from 'services/log';
import { TransferToOtherAssetBody } from './types';

export const RealEstateAssetStore = types
  .model({
    id: types.number,
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    portfolioId: types.number,
    transactionResponse: Response,
  })
  .actions((self) => {
    const editAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/realEstate/${self.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when edit real estate asset', res);
      }
    });
    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/realEstate/${self.id}/transactions`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get real estate transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });

    const assignInfo = (id: number) => {
      self.id = id;
    };
    const assignPortfolioId = (id: number) => {
      self.portfolioId = id;
    };
    const transferAsset = flow(function* (
      body: TransferToOtherAssetBody,
      assetId: number
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/realEstate/${assetId}/transaction`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        self.transactionResponse.makeError(res);
        log('Error when transfer real estate asset', res);
      } else {
        self.transactionResponse.makeSuccess();
      }
    });

    return {
      editAsset,
      assignInfo,
      getTransactionList,
      assignPortfolioId,
      transferAsset,
    };
  })
  .create({
    id: 0,
    loading: false,
    portfolioId: 0,
    transactionResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });