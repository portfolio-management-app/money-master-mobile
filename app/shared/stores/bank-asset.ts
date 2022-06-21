import {
  TransactionItem,
  Response,
  BankAsset,
  IBankAsset,
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
import { translateCreateTransactionError } from 'utils/translation';
import { buildTransactionQueryString } from 'utils/api';

export const BankAssetStore = types
  .model({
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    transactionResponse: Response,
    information: BankAsset,
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
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/bankSaving/${self.information.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when edit bank asset', res);
        self.editResponse.stopPending();
        self.editResponse.makeError(res);
      } else {
        self.editResponse.stopPending();
        self.editResponse.makeSuccess();
        self.information = res;
      }
    });
    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${
          self.information.portfolioId
        }/bankSaving/${
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
        log('Error when get bank asset transaction list', res);
      } else {
        self.transactionList = cast([...self.transactionList, ...res]);
      }
      self.loading = false;
    });

    const assignInfo = (info: IBankAsset) => {
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
        self.transactionResponse.stopPending();
        res.setMessage(translateCreateTransactionError(res));
        self.transactionResponse.makeError(res);
        log('Error when transfer bank asset', res);
      } else {
        self.transactionResponse.stopPending();
        self.transactionResponse.makeSuccess();
        const temp = { ...self.information };
        temp.inputMoneyAmount = 0;
        self.information = temp;
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
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/bankSaving/${self.information.id}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get bank information', res);
      } else {
        self.information = res;
      }
      self.loading = false;
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
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/bankSaving/${self.information.id}/profitLoss?period=${period}`,
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
      resetTransaction,
      assignInfo,
      getTransactionList,
      createTransaction,
      transferToFund,
      getInformation,
      registerPriceNotification,
      getProfitLoss,
    };
  })
  .create({
    information: {
      id: 0,
      portfolioId: 0,
      name: '',
      inputDay: '',
      inputMoneyAmount: 0,
      inputCurrency: 'USD',
      description: '',
      interestRate: 0,
      termRange: 0,
      isGoingToReinState: false,
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
