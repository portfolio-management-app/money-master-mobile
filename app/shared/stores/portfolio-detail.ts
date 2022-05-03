import { TransferToOtherAssetBody } from './types/index';
import { Config } from 'config';
import { HttpError } from 'errors/base';
import { cast, flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { log } from 'services/log';
import {
  CreateOtherAssetBody,
  CreateStockAssetBody,
  CryptoAssetBody,
} from './types';
import { UserStore } from './user';
import {
  BankAsset,
  RealEstateAsset,
  CryptoAsset,
  StockAsset,
  CurrencyAsset,
  CategoryAssetList,
  PieChartItem,
  PortfolioInformation,
  IPortfolio,
} from './../models';

const DeleteResponse = types.model({
  isSuccess: types.boolean,
  isError: types.boolean,
  errorMessage: types.string,
  pending: types.boolean,
});

const TransferResponse = types.model({
  isSuccess: types.boolean,
  isError: types.boolean,
  errorMessage: types.string,
  pending: types.boolean,
});

export const PortfolioDetailStore = types
  .model({
    information: PortfolioInformation,
    bankAssetList: types.array(BankAsset),
    realEstateAssetList: types.array(RealEstateAsset),
    cryptoAssetList: types.array(CryptoAsset),
    stockAssetList: types.array(StockAsset),
    currencyAssetList: types.array(CurrencyAsset),
    customAssetList: types.array(CategoryAssetList),
    pieChartInformation: types.array(PieChartItem),
    loading: types.boolean,
    loadingCreateCrypto: types.boolean,
    loadingCreateStockAsset: types.boolean,
    loadingCreateCurrencyAsset: types.boolean,
    doneLoadingCryptoAsset: types.boolean,
    doneLoadingStockAsset: types.boolean,
    doneLoadingCurrencyAsset: types.boolean,
    deleteResponse: DeleteResponse,
    transferResponse: TransferResponse,
  })
  .views((self) => ({
    getCoinByCode(code: string) {
      return self.cryptoAssetList.filter(
        (coin) => coin.cryptoCoinCode === code
      );
    },
    getStockBySymbol(symbol: string) {
      return self.stockAssetList.filter((stock) => stock.stockCode === symbol);
    },
    getCurrencyByCode(code: string) {
      return self.currencyAssetList.filter(
        (currency) => currency.currencyCode === code
      );
    },
  }))
  .actions((self) => {
    const createCurrencyAsset = flow(function* (body: any) {
      self.loadingCreateCurrencyAsset = true;
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/cash`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when create currency asset', res);
        return false;
      } else {
        getCurrencyAsset();
      }
      self.loadingCreateCurrencyAsset = false;
      return true;
    });
    const createCryptoAsset = flow(function* (body: CryptoAssetBody) {
      self.loadingCreateCrypto = true;
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/crypto`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when create crypto asset', res);
        return false;
      } else {
        getCryptoAsset();
      }
      self.loadingCreateCrypto = false;
      return true;
    });
    const createStockAsset = flow(function* (body: CreateStockAssetBody) {
      self.loadingCreateStockAsset = true;
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/stock`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when create stock asset', res);
        return false;
      } else {
        getStockAsset();
      }
      self.loadingCreateStockAsset = false;
      return true;
    });
    const createOtherAsset = flow(function* (
      body: CreateOtherAssetBody,
      assetTypeId: number
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/custom/${assetTypeId}`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        console.log(res);
      } else {
        getCustomAsset();
      }
    });

    const createBankAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/bankSaving`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('error when create bank', res);
      } else {
        getBankingAsset();
      }
    });

    const createRealEstateAsset = flow(function* (body: any) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/realEstate`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('error when create real estate', res);
      } else {
        getRealEstateAsset();
      }
    });

    const getAllAsset = flow(function* () {
      self.loading = true;
      yield Promise.all([
        getBankingAsset(),
        getRealEstateAsset(),
        getCryptoAsset(),
        getStockAsset(),
        getCurrencyAsset(),
        getCustomAsset(),
      ]);
      self.loading = false;
    });

    const getBankingAsset = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.id}/bankSaving`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('error when get bank asset list', res);
      } else {
        self.bankAssetList = res;
      }
    });

    const getRealEstateAsset = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.id}/realEstate`,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('error when get real estate asset list', res);
      } else {
        self.realEstateAssetList = res;
      }
    });

    const getCryptoAsset = flow(function* () {
      self.doneLoadingCryptoAsset = false;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.id}/crypto`,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('error when get crypto asset list', res);
      } else {
        self.cryptoAssetList = res;
      }
      self.doneLoadingCryptoAsset = true;
    });

    const getStockAsset = flow(function* () {
      self.doneLoadingStockAsset = false;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.id}/stock`,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('error when get crypto asset list', res);
      } else {
        self.stockAssetList = res;
      }
      self.doneLoadingStockAsset = true;
    });
    const getCurrencyAsset = flow(function* () {
      self.doneLoadingCurrencyAsset = false;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.id}/cash`,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('error when get currency asset list', res);
      } else {
        self.currencyAssetList = res;
      }
      self.doneLoadingCurrencyAsset = true;
    });
    const getCustomAsset = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.id}/custom`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('error when get custom asset list', res);
      } else {
        self.customAssetList = res;
      }
    });

    const deleteCryptoAsset = flow(function* (assetId: number) {
      self.deleteResponse.pending = true;
      const res = yield httpRequest.sendDelete(
        `${Config.BASE_URL}/portfolio/${self.information.id}/crypto/${assetId}`,
        UserStore.user.token
      );
      self.deleteResponse.pending = false;
      if (res instanceof HttpError) {
        makeDeleteError(res);
        log('Error when delete crypto asset', res);
        return false;
      } else {
        getCryptoAsset();
        dispatchDeleteSuccess();
        return true;
      }
    });
    const deleteStockAsset = flow(function* (assetId: number) {
      self.deleteResponse.pending = true;
      const res = yield httpRequest.sendDelete(
        `${Config.BASE_URL}/portfolio/${self.information.id}/stock/${assetId}`,
        UserStore.user.token
      );
      self.deleteResponse.pending = false;
      if (res instanceof HttpError) {
        makeDeleteError(res);
        log('Error when delete stock asset', res);
        return false;
      } else {
        getStockAsset();
        dispatchDeleteSuccess();
        return true;
      }
    });
    const deleteBankAsset = flow(function* (assetId: number) {
      self.deleteResponse.pending = true;
      const res = yield httpRequest.sendDelete(
        `${Config.BASE_URL}/portfolio/${self.information.id}/bankSaving/${assetId}`,
        UserStore.user.token
      );
      self.deleteResponse.pending = false;

      if (res instanceof HttpError) {
        makeDeleteError(res);
        log('Error when delete bank asset', res);
        return false;
      } else {
        getBankingAsset();
        dispatchDeleteSuccess();
        return true;
      }
    });
    const deleteRealEstateAsset = flow(function* (assetId: number) {
      self.deleteResponse.pending = true;
      const res = yield httpRequest.sendDelete(
        `${Config.BASE_URL}/portfolio/${self.information.id}/realEstate/${assetId}`,
        UserStore.user.token
      );
      self.deleteResponse.pending = false;
      if (res instanceof HttpError) {
        makeDeleteError(res);
        log('Error when delete real estate asset', res);
        return false;
      } else {
        getRealEstateAsset();
        dispatchDeleteSuccess();
        return true;
      }
    });

    const deleteCashAsset = flow(function* (assetId: number) {
      self.deleteResponse.pending = true;
      const res = yield httpRequest.sendDelete(
        `${Config.BASE_URL}/portfolio/${self.information.id}/cash/${assetId}`,
        UserStore.user.token
      );
      self.deleteResponse.pending = false;
      if (res instanceof HttpError) {
        makeDeleteError(res);
        log('Error when delete cash asset', res);
        return false;
      } else {
        getCurrencyAsset();
        dispatchDeleteSuccess();
        return true;
      }
    });

    const deleteCustomAsset = flow(function* (assetId: number) {
      self.deleteResponse.pending = true;
      const res = yield httpRequest.sendDelete(
        `${Config.BASE_URL}/portfolio/${self.information.id}/custom/${assetId}`,
        UserStore.user.token
      );
      self.deleteResponse.pending = false;
      if (res instanceof HttpError) {
        makeDeleteError(res);
        log('Error when delete custom asset', res);
        return false;
      } else {
        getCustomAsset();
        dispatchDeleteSuccess();
        return true;
      }
    });

    const getPieChart = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.id}/pieChart`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('error when get pie chart', res);
      } else {
        self.pieChartInformation = res;
      }
    });

    const makeDeleteError = (error: HttpError) => {
      self.deleteResponse.errorMessage = error.getMessage();
      self.deleteResponse.isError = true;
    };

    const dispatchDeleteSuccess = () => {
      self.deleteResponse.isSuccess = true;
    };

    const clearDeleteSuccess = () => {
      self.deleteResponse.isSuccess = false;
    };

    const clearDeleteError = () => {
      self.deleteResponse.isError = false;
      self.deleteResponse.errorMessage = '';
    };

    const assignInfo = (portfolio: IPortfolio) => {
      self.information = { ...portfolio };
    };

    const cleanUp = () => {
      self.bankAssetList = cast([]);
      self.cryptoAssetList = cast([]);
      self.currencyAssetList = cast([]);
      self.customAssetList = cast([]);
      self.stockAssetList = cast([]);
      self.loading = false;
      self.loadingCreateCrypto = false;
      self.loadingCreateCurrencyAsset = false;
      self.loadingCreateStockAsset = false;
    };

    return {
      createOtherAsset,
      assignInfo,
      createBankAsset,
      createRealEstateAsset,
      getAllAsset,
      createCryptoAsset,
      createStockAsset,
      getStockAsset,
      createCurrencyAsset,
      getPieChart,
      getCryptoAsset,
      getBankingAsset,
      getCurrencyAsset,
      deleteBankAsset,
      deleteCryptoAsset,
      deleteRealEstateAsset,
      deleteStockAsset,
      deleteCashAsset,
      cleanUp,
      clearDeleteError,
      clearDeleteSuccess,
      deleteCustomAsset,
    };
  })
  .create({
    information: {
      id: 0,
      name: '',
      initialCash: 0,
      initialCurrency: '',
      sum: 0,
    },
    loading: false,
    loadingCreateCrypto: false,
    loadingCreateStockAsset: false,
    loadingCreateCurrencyAsset: false,
    doneLoadingCryptoAsset: false,
    doneLoadingStockAsset: false,
    doneLoadingCurrencyAsset: false,
    deleteResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
    transferResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
