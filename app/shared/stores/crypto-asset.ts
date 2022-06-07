import { parseToString } from 'utils/date';
import { HttpError } from 'errors/base';
import { Config } from 'config';
import { types, flow } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { UserStore } from 'shared/stores';
import {
  TransactionItem,
  Response,
  CryptoAsset,
  ICryptoAsset,
} from 'shared/models';
import { log } from 'services/log';
import {
  TransferToInvestFundBody,
  SellToCashBody,
  RegisterAssetNotificationBody,
} from './types';
import { translateInvestFundError } from 'utils/translation';
import { EXCEL_COLUMNS } from 'shared/constants';

export const CryptoAssetStore = types
  .model({
    transactionList: types.array(TransactionItem),
    loading: types.boolean,
    transactionResponse: Response,
    editResponse: Response,
    information: CryptoAsset,
  })
  .views((self) => ({
    getExcelData() {
      const object: any = {};
      object[EXCEL_COLUMNS.assetName] = self.information.name;
      object[EXCEL_COLUMNS.coinCode] = self.information.cryptoCoinCode;
      if (self.information.description !== '') {
        object[EXCEL_COLUMNS.description] = self.information.description;
      }
      object[EXCEL_COLUMNS.amount] = self.information.currentAmountInCurrency;
      object[EXCEL_COLUMNS.amountHolding] =
        self.information.currentAmountHolding;
      object[EXCEL_COLUMNS.buyPrice] = self.information.purchasePrice;
      object[EXCEL_COLUMNS.currency] = self.information.currencyCode;
      object[EXCEL_COLUMNS.buyDate] = parseToString(
        new Date(self.information.inputDay)
      );
      return [object];
    },
  }))
  .actions((self) => {
    const editAsset = flow(function* (body: any) {
      self.editResponse.makePending();
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/crypto/${self.information.id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when edit crypto asset', res);
        self.editResponse.stopPending();
        self.editResponse.makeError(res);
      } else {
        self.information = res;
        self.editResponse.stopPending();
        self.editResponse.makeSuccess();
      }
    });

    const getTransactionList = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/crypto/${self.information.id}/transactions`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get crypto transaction list', res);
      } else {
        self.transactionList = res;
      }
      self.loading = false;
    });

    const sellToCash = flow(function* (body: SellToCashBody) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/transactions`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when transfer crypto asset', res);
        res.setMessage(translateInvestFundError(res));
        self.transactionResponse.makeError(res);
      } else {
        self.transactionResponse.makeSuccess();
        getTransactionList();
        getInformation();
      }
    });
    const transferToFund = flow(function* (body: TransferToInvestFundBody) {
      self.transactionResponse.makePending();
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/fund`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log('Error when transfer asset to invest fund', res);
        self.transactionResponse.stopPending();
        self.transactionResponse.makeError(res);
      } else {
        self.transactionResponse.stopPending();
        self.transactionResponse.makeSuccess();
        getTransactionList();
        getInformation();
      }
    });
    const getInformation = flow(function* () {
      self.loading = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/crypto/${self.information.id}`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when get crypto information', res);
      } else {
        self.information = res;
      }
      self.loading = false;
    });
    const assignInfo = (info: ICryptoAsset) => {
      self.information = { ...info };
    };

    const registerPriceNotification = flow(function* (
      body: RegisterAssetNotificationBody
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.portfolioId}/notification`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when register notification', res);
      } else {
        log('Register notification success', res);
      }
    });

    return {
      editAsset,
      assignInfo,
      getTransactionList,
      sellToCash,
      transferToFund,
      getInformation,
      registerPriceNotification,
    };
  })
  .create({
    information: {
      id: 0,
      name: '',
      inputDay: '',
      currentAmountHolding: 0,
      lastChanged: '',
      portfolioId: 0,
      description: '',
      purchasePrice: 0,
      currencyCode: 'VND',
      cryptoCoinCode: '',
      currentPrice: 0,
      currentAmountInCurrency: 0,
    },
    loading: false,
    transactionResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
    editResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
