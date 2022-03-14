import { StockItem } from './model';
import { cast, flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/api';
import { Config } from 'config';
import { HttpError } from 'errors/base';

export const StockStore = types
  .model('StockStore', {
    stockList: types.array(StockItem),
    loading: types.boolean,
  })
  .actions((self) => {
    const getStockList = flow(function* () {
      if (!self.stockList.length) {
        self.loading = true;
        const res = yield httpRequest.sendGet(
          `${Config.STOCK_API_URL}/stocks?country=USA`
        );
        if (res instanceof HttpError) {
          console.log(res);
        } else {
          self.stockList = cast(res.data);
        }
        self.loading = false;
      }
    });

    return { getStockList };
  })
  .create({
    stockList: [],
    loading: false,
  });
