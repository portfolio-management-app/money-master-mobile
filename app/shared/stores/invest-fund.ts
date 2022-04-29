import { PortfolioDetailStore } from 'shared/stores';
import { translateInvestFundError } from 'utils/translation';
import { Config } from 'config';
import { HttpError } from 'errors/base';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { log } from 'services/log';
import { TransferToInvestFundBody } from './types';
import { UserStore } from './user';
import { InvestFundInformation } from './../models';

export const InvestFundStore = types
  .model('InvestFundStore', {
    loading: types.boolean,
    isError: types.boolean,
    errorMessage: types.string,
    isSuccess: types.boolean,
    portfolioId: types.number,
    information: InvestFundInformation,
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
        PortfolioDetailStore.getCryptoAsset();
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
        self.information = res;
      }
    });

    const assignPortfolioId = (id: number) => {
      self.portfolioId = id;
    };

    const dispatchSuccess = () => {
      self.isSuccess = !self.isSuccess;
    };

    const makeError = (error: HttpError) => {
      self.errorMessage = translateInvestFundError(error);
      self.isError = true;
    };
    const clearError = () => {
      self.errorMessage = '';
      self.isError = false;
    };
    return {
      transferToFund,
      dispatchSuccess,
      clearError,
      assignPortfolioId,
      getFund,
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
  });
