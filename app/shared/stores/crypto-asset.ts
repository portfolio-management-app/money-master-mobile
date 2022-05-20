import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import {
  TransactionItem,
  Response,
  CryptoAsset,
  ICryptoAsset,
} from 'shared/models';
import { log } from 'services/log';
import { TransferToOtherAssetBody } from './types';

export const CryptoAssetStore = types
  .model({
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    transactionResponse: Response,
    information: CryptoAsset,
  })
  .actions((self) => {
    const editAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/crypto/${self.information.id}`,
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
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/crypto/${self.information.id}/transactions`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get crypto transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });

    const transferAsset = flow(function* (
      body: TransferToOtherAssetBody,
      assetId: number
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/crypto/${assetId}/transaction`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when transfer crypto asset', res);
        self.transactionResponse.makeError(res);
      } else {
        self.transactionResponse.makeSuccess();
        getTransactionList();
      }
    });
    const assignInfo = (info: ICryptoAsset) => {
      self.information = { ...info };
    };

    return {
      editAsset,
      assignInfo,
      getTransactionList,
      transferAsset,
    };
  })
  .create({
    information: {
      id: 0,
      name: '',
      inputDay: '',
      currentAmountHolding: 0,
      lastChanged: '',
      portfolioId: 0,
      description: '',
      purchasePrice: 0,
      currencyCode: 'VND',
      cryptoCoinCode: '',
      currentPrice: 0,
      currentAmountInCurrency: 0,
    },
    loading: false,
    transactionResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
