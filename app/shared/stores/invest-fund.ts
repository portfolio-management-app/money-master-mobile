import { PortfolioDetailStore } from 'shared/stores';
import { translateInvestFundError } from 'utils/translation';
import { Config } from 'config';
import { HttpError } from 'errors/base';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { TransferToInvestFundBody } from './types';
import { UserStore } from './user';

export const InvestFundStore = types
  .model('InvestFundStore', {
    loading: types.boolean,
    isError: types.boolean,
    errorMessage: types.string,
    isSuccess: types.boolean,
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
    return { transferToFund, dispatchSuccess, clearError };
  })
  .create({
    loading: false,
    isError: false,
    errorMessage: '',
    isSuccess: false,
  });
