import { Config } from 'config';
import { HttpError } from 'errors/base';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { UserStore } from 'shared/stores';
import { PortfolioInformation } from './model';

export type AddNewBody = {
  name: string;
  initialCash: 0;
  initialCurrency: string;
};

export const PortfolioStore = types
  .model('PortfolioStore', {
    portfolioList: types.array(PortfolioInformation),
    loading: types.boolean,
  })
  .actions(() => {
    const addNewPortfolio = flow(function* (body: AddNewBody) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        console.log(res);
      }
    });

    return { addNewPortfolio };
  })
  .create({
    portfolioList: [
      { id: 1, name: 'Investment 1', dailyIncrease: 10.242, balance: 45.32426 },
      { id: 2, name: 'Investment 2', dailyIncrease: 4.345, balance: 121.2419 },
    ],
    loading: false,
  });
