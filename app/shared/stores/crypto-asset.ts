import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import { TransactionItem } from 'shared/models';
import { log } from 'services/log';
import { TransferToOtherAssetBody } from './types';

export const CryptoAssetStore = types
  .model({
    id: types.number,
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    portfolioId: types.number,
  })
  .actions((self) => {
    const editAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/crypto/${self.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        console.log(res);
      }
    });

    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/crypto/${self.id}/transactions`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get crypto transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });

    const transferCryptoAsset = flow(function* (
      body: TransferToOtherAssetBody,
      assetId: number
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/crypto/${assetId}/transaction`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when transfer crypto asset', res);
      }
    });
    const assignInfo = (id: number) => {
      self.id = id;
    };

    const assignPortfolioId = (id: number) => {
      self.portfolioId = id;
    };

    return {
      editAsset,
      assignInfo,
      getTransactionList,
      transferCryptoAsset,
      assignPortfolioId,
    };
  })
  .create({
    id: 0,
    loading: false,
    portfolioId: 0,
  });
