import { MetalInformation } from './model';
import { flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
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
      ts: 1647847947732,
      tsj: 1647847945949,
      date: 'Mar 21st 2022, 03:32:25 am NY',
      items: [
        {
          curr: 'USD',
          xauPrice: 1924.275,
          xagPrice: 24.9677,
          chgXau: 5.58,
          chgXag: 0.0557,
          pcXau: 0.2908,
          pcXag: 0.2236,
          xauClose: 1918.695,
          xagClose: 24.912,
        },
      ],
    },
    loading: false,
  });
