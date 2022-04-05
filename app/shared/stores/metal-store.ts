import { MetalInformation } from '../models';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { HttpError } from 'errors/base';

export const MetalStore = types
  .model('MedalStore', {
    information: MetalInformation,
    loading: types.boolean,
  })
  .actions((self) => {
    const getMetalData = flow(function* (currency: string) {
      const res = yield httpRequest.sendGet(
        `https://data-asg.goldprice.org/dbXRates/${currency}`
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        self.information = res;
      }

      self.loading = false;
    });

    return { getMetalData };
  })
  .create({
    information: {
      ts: 0,
      tsj: 0,
      date: '',
      items: [
        {
          curr: 'VND',
          xauPrice: 0,
          xagPrice: 0,
          chgXau: 0,
          chgXag: 0,
          pcXau: 0,
          pcXag: 0,
          xauClose: 0,
          xagClose: 0,
        },
      ],
    },
    loading: false,
  });
