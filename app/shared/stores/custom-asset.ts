import { CustomAsset, ICustomAsset, TransactionItem } from 'shared/models';
import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import { log } from 'services/log';
import { TransferToOtherAssetBody } from './types';
import { translateInvestFundError } from 'utils/translation';

export const CustomAssetStore = types
  .model({
    information: CustomAsset,
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    portfolioId: types.number,
  })
  .actions((self) => {
    const editAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/custom/${self.information.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when edit custom asset', res);
      }
    });
    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/custom/${self.information.id}/transactions`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get custom transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });

    const assignInfo = (info: ICustomAsset) => {
      self.information = { ...info };
    };
    const assignPortfolioId = (id: number) => {
      self.portfolioId = id;
    };
    const transferAsset = flow(function* (
      body: TransferToOtherAssetBody,
      assetId: number
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/custom/${assetId}/transaction`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when transfer custom asset', res);
        res.setMessage(translateInvestFundError(res));
      } else {
        getTransactionList();
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
    information: {
      id: 0,
      name: '',
      inputDay: '',
      inputMoneyAmount: 0,
      inputCurrency: '',
      description: '',
      interestRate: 0,
      termRange: 0,
    },
    loading: false,
    portfolioId: 0,
  });
