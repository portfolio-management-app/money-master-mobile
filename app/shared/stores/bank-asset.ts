import {
  TransactionItem,
  Response,
  BankAsset,
  IBankAsset,
} from 'shared/models';
import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import { log } from 'services/log';
import { TransferToOtherAssetBody } from './types';
import { EXCEL_COLUMNS } from 'shared/constants';
import { parseToString } from 'utils/date';

export const BankAssetStore = types
  .model({
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    portfolioId: types.number,
    transactionResponse: Response,
    information: BankAsset,
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
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/bankSaving/${self.information.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when edit bank asset', res);
      }
    });
    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/bankSaving/${self.information.id}/transactions`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get bank asset transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });

    const assignInfo = (info: IBankAsset) => {
      self.information = { ...info };
    };
    const assignPortfolioId = (id: number) => {
      self.portfolioId = id;
    };
    const transferAsset = flow(function* (
      body: TransferToOtherAssetBody,
      assetId: number
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.portfolioId}/bankSaving/${assetId}/transaction`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        self.transactionResponse.makeError(res);
        log('Error when transfer bank asset', res);
      } else {
        self.transactionResponse.makeSuccess();
      }
    });

    return {
      editAsset,
      assignInfo,
      getTransactionList,
      assignPortfolioId,
      transferAsset,
    };
  })
  .create({
    information: {
      id: 0,
      name: '',
      inputDay: '',
      inputMoneyAmount: 0,
      inputCurrency: 'USD',
      lastChanged: '',
      description: '',
      interestRate: 0,
      termRange: 0,
      isGoingToReinState: false,
    },
    loading: false,
    portfolioId: 0,
    transactionResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
