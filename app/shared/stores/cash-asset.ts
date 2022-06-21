import { translateCreateTransactionError } from 'utils/translation';
import {
  CashAsset,
  ICashAsset,
  Response,
  TransactionItem,
  TransactionQuery,
  Profit,
} from 'shared/models';
import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow, cast } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import { log } from 'services/log';
import {
  TransferToInvestFundBody,
  CreateTransactionBody,
  RegisterAssetNotificationBody,
  ProfitPeriod,
} from './types';
import { EXCEL_COLUMNS } from 'shared/constants';
import { parseToString } from 'utils/date';
import { buildTransactionQueryString } from 'utils/api';

export const CashAssetStore = types
  .model({
    information: CashAsset,
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    transactionResponse: Response,
    editResponse: Response,
    transactionQuery: TransactionQuery,
    profit: types.array(Profit),
  })
  .views((self) => ({
    getExcelData() {
      const object: any = {};
      object[EXCEL_COLUMNS.assetName] = self.information.name;
      if (self.information.description !== '') {
        object[EXCEL_COLUMNS.description] = self.information.description;
      }
      object[EXCEL_COLUMNS.amount] = self.information.amount;
      object[EXCEL_COLUMNS.currency] = self.information.currencyCode;
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
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/cash/${self.information.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        self.editResponse.stopPending();
        log('Error when edit cash asset', res);
        self.editResponse.makeError(res);
      } else {
        self.information = res;
        self.editResponse.stopPending();
        self.editResponse.makeSuccess();
      }
    });
    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/cash/${
          self.information.id
        }/transactions${buildTransactionQueryString(
          self.transactionQuery.startDate,
          self.transactionQuery.endDate,
          self.transactionQuery.pageSize,
          self.transactionQuery.pageNumber,
          self.transactionQuery.type
        )}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get cash transaction list', res);
      } else {
        self.transactionList = cast([...self.transactionList, ...res]);
      }
      self.loading = false;
    });

    const assignInfo = (info: ICashAsset) => {
      self.information = { ...info };
    };

    const createTransaction = flow(function* (body: CreateTransactionBody) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/transactions`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when transfer cash asset', res);
        res.setMessage(translateCreateTransactionError(res));

        self.transactionResponse.makeError(res);
      } else {
        self.transactionResponse.makeSuccess();
        getTransactionList();
        getInformation();
      }
    });

    const getInformation = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/cash/${self.information.id}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get cash information', res);
      } else {
        self.information = res;
      }
      self.loading = false;
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

    const registerPriceNotification = flow(function* (
      body: RegisterAssetNotificationBody
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/notification`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when register notification', res);
      } else {
        log('Register notification success', res);
      }
    });

    const resetTransaction = () => {
      self.transactionList = cast([]);
    };

    const getProfitLoss = flow(function* (period: ProfitPeriod) {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/cash/${self.information.id}/profitLoss?period=${period}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get profit in crypto', res);
      } else {
        self.profit = res;
      }
      self.loading = false;
    });
    return {
      editAsset,
      assignInfo,
      getTransactionList,
      createTransaction,
      transferToFund,
      getInformation,
      registerPriceNotification,
      resetTransaction,
      getProfitLoss,
    };
  })
  .create({
    information: {
      id: 0,
      amount: 0,
      currencyCode: 'USD',
      name: '',
      inputDay: '',
      lastChanged: '',
      portfolioId: 0,
      description: '',
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
    transactionQuery: {
      startDate: null,
      endDate: null,
      pageNumber: 1,
      pageSize: 10,
      type: 'all',
    },
  });
