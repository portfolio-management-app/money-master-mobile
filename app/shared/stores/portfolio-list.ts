import { flow, types } from 'mobx-state-tree';
import { Config } from 'config';
import { HttpError } from 'errors/base';
import { httpRequest } from 'services/http';
import { UserStore } from './user';
import { PortfolioInformation } from '../models';

export type AddNewBody = {
  name: string;
  initialCash: 0;
  initialCurrency: string;
};

export const PortfolioListStore = types
  .model({
    portfolioList: types.array(PortfolioInformation),
    loading: types.boolean,
  })
  .actions((self) => {
    const addNewPortfolio = flow(function* (body: AddNewBody) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        yield getPortfolioList();
      }
    });

    const getPortfolioList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        self.portfolioList = res;
      }
      self.loading = false;
    });

    return { addNewPortfolio, getPortfolioList };
  })
  .create({
    portfolioList: [],
    loading: false,
  });
