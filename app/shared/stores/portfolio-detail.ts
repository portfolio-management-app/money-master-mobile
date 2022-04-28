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
} from './../models';

const DeleteResponse = types.model({
  isSuccess: types.boolean,
  isError: types.boolean,
  errorMessage: types.string,
  pending: types.boolean,
});

export const PortfolioDetailStore = types
  .model({
    id: types.number,
    name: types.string,
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
    deleteResponse: DeleteResponse,
  })
  .views((self) => ({
    getCoinByCode(code: string) {
      return self.cryptoAssetList.filter(
        (coin) => coin.cryptoCoinCode === code
      );
    },
  }))
  .actions((self) => {
    const createCurrencyAsset = flow(function* (body: any) {
      self.loadingCreateCurrencyAsset = true;
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.id}/cash`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/crypto`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/stock`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/custom/${assetTypeId}`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/bankSaving`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/realEstate`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/bankSaving`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/realEstate`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/crypto`,
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
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.id}/stock`,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('error when get crypto asset list', res);
      } else {
        self.stockAssetList = res;
      }
    });
    const getCurrencyAsset = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.id}/cash`,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('error when get currency asset list', res);
      } else {
        self.currencyAssetList = res;
      }
    });
    const getCustomAsset = flow(function* () {
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.id}/custom`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/crypto/${assetId}`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/stock/${assetId}`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/bankSaving/${assetId}`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/realEstate/${assetId}`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/cash/${assetId}`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/custom/${assetId}`,
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
        `${Config.BASE_URL}/portfolio/${self.id}/pieChart`,
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

    const assignInfo = (id: number, name: string) => {
      self.id = id;
      self.name = name;
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
    id: 0,
    name: '',
    loading: false,
    loadingCreateCrypto: false,
    loadingCreateStockAsset: false,
    loadingCreateCurrencyAsset: false,
    doneLoadingCryptoAsset: false,
    deleteResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
