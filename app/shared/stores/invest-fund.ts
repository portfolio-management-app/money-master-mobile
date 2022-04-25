import { Config } from 'config';
import { HttpError } from 'errors/base';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { TransferToInvestFundBody } from './types';
import { UserStore } from './user';

export const InvestFundStore = types
  .model('InvestFundStore', {
    loading: types.boolean,
  })
  .actions((self) => {
    const transferToFund = flow(function* (
      portfolioId: string,
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
      }
      self.loading = false;
    });
    return { transferToFund };
  })
  .create({
    loading: false,
  });
