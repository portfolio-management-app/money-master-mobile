import { Config } from 'config';
import { HttpError } from 'errors/base';
import { cast, flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { log } from 'services/log';
import { TransferToInvestFundBody } from './types';
import { UserStore } from './user';
import {
  InvestFundInformation,
  TransactionItem,
  TransactionQuery,
} from './../models';
import { buildTransactionQueryString } from 'utils/api';

export const InvestFundStore = types
  .model('InvestFundStore', {
    loading: types.boolean,
    isError: types.boolean,
    errorMessage: types.string,
    isSuccess: types.boolean,
    portfolioId: types.number,
    information: InvestFundInformation,
    transactionList: types.array(TransactionItem),
    transactionQuery: TransactionQuery,
  })
  .actions((self) => {
    const transferToFund = flow(function* (
      portfolioId: number,
      body: TransferToInvestFundBody
    ) {
      self.loading = true;
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${portfolioId}/fund`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log('Error when transfer asset to invest fund', res);
        makeError(res);
      } else {
        dispatchSuccess();
      }
      self.loading = false;
    });

    const getFund = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/fund`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get invest fund', res);
      } else {
        console.log('get invest fund info');
        self.information = res;
      }
    });

    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${
          self.portfolioId
        }/investFund/transactions${buildTransactionQueryString(
          self.transactionQuery.startDate,
          self.transactionQuery.endDate,
          self.transactionQuery.pageSize,
          self.transactionQuery.pageNumber,
          self.transactionQuery.type
        )}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get invest fund transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });

    const getAllInformation = flow(function* () {
      yield Promise.all([getFund(), getTransactionList()]);
    });

    const assignPortfolioId = (id: number) => {
      self.portfolioId = id;
    };

    const dispatchSuccess = () => {
      self.isSuccess = !self.isSuccess;
    };

    const makeError = (error: HttpError) => {
      self.errorMessage = error.httpMessage;
      self.isError = true;
    };
    const clearError = () => {
      self.errorMessage = '';
      self.isError = false;
    };

    const resetTransaction = () => {
      self.transactionList = cast([]);
    };
    return {
      transferToFund,
      dispatchSuccess,
      clearError,
      assignPortfolioId,
      getFund,
      getTransactionList,
      getAllInformation,
      resetTransaction,
    };
  })
  .create({
    loading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false,
    portfolioId: 0,
    information: {
      portfolioId: 0,
      currentAmount: 0,
      isDeleted: false,
      initialCurrency: 'USD',
    },
    transactionQuery: {
      startDate: null,
      endDate: null,
      pageNumber: 1,
      pageSize: 10,
      type: 'all',
    },
  });
