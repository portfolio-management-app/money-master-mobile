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
import { TransferToInvestFundBody, SellToCashBody } from './types';
import { translateInvestFundError } from 'utils/translation';
import { EXCEL_COLUMNS } from 'shared/constants';
import { parseToString } from 'utils/date';

export const RealEstateAssetStore = types
  .model({
    information: RealEstateAsset,
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    transactionResponse: Response,
    editResponse: Response,
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
      self.editResponse.makePending();
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/realEstate/${self.information.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when edit real estate asset', res);
        self.editResponse.stopPending();
        self.editResponse.makeError(res);
      } else {
        self.editResponse.stopPending();
        self.information = res;
        self.editResponse.makeSuccess();
      }
    });
    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/realEstate/${self.information.id}/transactions`,
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

    const sellToCash = flow(function* (body: SellToCashBody) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/transactions`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        res.setMessage(translateInvestFundError(res));
        self.transactionResponse.makeError(res);
        log('Error when transfer real estate asset', res);
      } else {
        self.transactionResponse.makeSuccess();
        getInformation();
        getTransactionList();
      }
    });
    const transferToFund = flow(function* (body: TransferToInvestFundBody) {
      self.transactionResponse.makePending();
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/fund`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log('Error when transfer asset to invest fund', res);
        self.transactionResponse.stopPending();
        self.transactionResponse.makeError(res);
      } else {
        self.transactionResponse.stopPending();
        self.transactionResponse.makeSuccess();
        getTransactionList();
        getInformation();
      }
    });

    const getInformation = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/realEstate/${self.information.id}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get real estate information', res);
      } else {
        self.information = res;
      }
      self.loading = false;
    });

    return {
      editAsset,
      assignInfo,
      getTransactionList,
      sellToCash,
      transferToFund,
      getInformation,
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
      portfolioId: 0,
    },
    loading: false,

    transactionResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
    editResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
