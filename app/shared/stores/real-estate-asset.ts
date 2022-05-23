import {
  TransactionItem,
  Response,
  RealEstateAsset,
  IRealEstateAsset,
} from 'shared/models';
import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import { log } from 'services/log';
import { TransferToOtherAssetBody } from './types';
import { translateInvestFundError } from 'utils/translation';
import { EXCEL_COLUMNS } from 'shared/constants';
import { parseToString } from 'utils/date';

export const RealEstateAssetStore = types
  .model({
    information: RealEstateAsset,
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    portfolioId: types.number,
    transactionResponse: Response,
  })
  .views((self) => ({
    getExcelData() {
      const object: any = {};
      object[EXCEL_COLUMNS.assetName] = self.information.name;
      if (self.information.description !== '') {
        object[EXCEL_COLUMNS.description] = self.information.description;
      }
      object[EXCEL_COLUMNS.buyPrice] = self.information.inputMoneyAmount;
      object[EXCEL_COLUMNS.currentPrice] = self.information.currentPrice;
      object[EXCEL_COLUMNS.currency] = self.information.inputCurrency;
      object[EXCEL_COLUMNS.buyDate] = parseToString(
        new Date(self.information.inputDay)
      );
      return [object];
    },
  }))
  .actions((self) => {
    const editAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/realEstate/${self.information.id}`,
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
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/realEstate/${self.information.id}/transactions`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get real estate transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });

    const assignInfo = (info: IRealEstateAsset) => {
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
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/realEstate/${assetId}/transaction`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        res.setMessage(translateInvestFundError(res));
        self.transactionResponse.makeError(res);
        log('Error when transfer real estate asset', res);
      } else {
        self.transactionResponse.makeSuccess();
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
      inputCurrency: 'USD',
      lastChanged: '',
      description: '',
      currentPrice: 0,
    },
    loading: false,
    portfolioId: 0,
    transactionResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
