import { TransactionItem } from 'shared/models';
import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { PortfolioDetailStore, UserStore } from 'shared/stores';
import { log } from 'services/log';

export const CustomAssetDetailStore = types
  .model({
    id: types.number,
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
  })
  .actions((self) => {
    const editCustomAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${PortfolioDetailStore.id}/bankSaving/${self.id}`,
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
        `${Config.BASE_URL}/portfolio/${PortfolioDetailStore.id}/custom/${self.id}/transactions`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get custom transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });
    const assignInfo = (id: number) => {
      self.id = id;
    };

    return { editCustomAsset, assignInfo, getTransactionList };
  })
  .create({
    id: 0,
    loading: false,
  });
