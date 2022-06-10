import {
  CustomAsset,
  ICustomAsset,
  Response,
  TransactionItem,
} from 'shared/models';
import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import { log } from 'services/log';
import { CreateTransactionBody, TransferToInvestFundBody } from './types';
import { translateInvestFundError } from 'utils/translation';
import { EXCEL_COLUMNS } from 'shared/constants';
import { parseToString } from 'utils/date';

export const CustomAssetStore = types
  .model({
    information: CustomAsset,
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
      object[EXCEL_COLUMNS.inputMoney] = self.information.inputMoneyAmount;
      object[EXCEL_COLUMNS.currency] = self.information.inputCurrency;
      object[EXCEL_COLUMNS.interestRate] = self.information.interestRate;
      object[EXCEL_COLUMNS.termRange] = self.information.termRange;
      object[EXCEL_COLUMNS.startDate] = parseToString(
        new Date(self.information.inputDay)
      );
      return [object];
    },
  }))
  .actions((self) => {
    const editAsset = flow(function* (body: any) {
      self.editResponse.makePending();
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/custom/${self.information.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when edit custom asset', res);
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
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/custom/${self.information.id}/transactions`,
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

    const createTransaction = flow(function* (body: CreateTransactionBody) {
      self.transactionResponse.makePending();
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/transactions`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when transfer custom asset', res);
        self.transactionResponse.stopPending();
        res.setMessage(translateInvestFundError(res));
        self.transactionResponse.makeError(res);
      } else {
        self.transactionResponse.makeSuccess();
        getTransactionList();
        getInformation();
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
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/custom/${self.information.id}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get custom information', res);
      } else {
        self.information = res;
      }
      self.loading = false;
    });

    return {
      editAsset,
      transferToFund,
      assignInfo,
      getTransactionList,
      createTransaction,
      getInformation,
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
