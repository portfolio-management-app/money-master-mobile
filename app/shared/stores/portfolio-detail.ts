import { PortfolioListStore } from 'shared/stores';
import { Config } from 'config';
import { HttpError } from 'errors/base';
import { cast, flow, types } from 'mobx-state-tree';
import { httpRequest } from 'services/http';
import { log } from 'services/log';
import {
  CreateOtherAssetBody,
  CreateStockAssetBody,
  CreateCryptoAssetBody,
  CreateCurrencyAssetBody,
  CreateBankAssetBody,
  CreateRealEstateAssetBody,
  EditPortfolioBody,
} from './types';
import { UserStore } from './user';
import {
  BankAsset,
  RealEstateAsset,
  CryptoAsset,
  StockAsset,
  CashAsset,
  CategoryAssetList,
  PieChartItem,
  PortfolioInformation,
  IPortfolio,
  Response,
} from './../models';
import { InvestFundStore } from './invest-fund';

export const PortfolioDetailStore = types
  .model({
    information: PortfolioInformation,
    bankAssetList: types.array(BankAsset),
    realEstateAssetList: types.array(RealEstateAsset),
    cryptoAssetList: types.array(CryptoAsset),
    stockAssetList: types.array(StockAsset),
    currencyAssetList: types.array(CashAsset),
    customAssetList: types.array(CategoryAssetList),
    pieChartInformation: types.array(PieChartItem),
    loading: types.boolean,
    loadingCreateCrypto: types.boolean,
    loadingCreateStockAsset: types.boolean,
    loadingCreateCurrencyAsset: types.boolean,
    loadingGetPieChart: types.boolean,
    doneLoadingCryptoAsset: types.boolean,
    doneLoadingStockAsset: types.boolean,
    doneLoadingCurrencyAsset: types.boolean,
    deleteResponse: Response,
    transferResponse: Response,
    createResponse: Response,
    pieChartCount: 0,
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
    getTotalMoney() {
      let sum = 0;
      for (let i = 0; i < self.pieChartInformation.length; i++) {
        sum += self.pieChartInformation[i].sumValue;
      }
      return sum;
    },
    getCurrencyById(id: number) {
      const find = self.currencyAssetList.find((e) => e.id === id);
      return find;
    },
    getStockById(id: number) {
      const find = self.stockAssetList.find((e) => e.id === id);
      return find;
    },
    getCryptoById(id: number) {
      const find = self.cryptoAssetList.find((e) => e.id === id);
      console.log(find);
      return find;
    },
    getBankById(id: number) {
      const find = self.bankAssetList.find((e) => e.id === id);
      return find;
    },
    getRealEstateById(id: number) {
      const find = self.realEstateAssetList.find((e) => e.id === id);
      console.log(find);
      return find;
    },
  }))
  .actions((self) => {
    const createCurrencyAsset = flow(function* (body: CreateCurrencyAssetBody) {
      self.loadingCreateCurrencyAsset = true;
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/cash`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when create currency asset', res);
        self.createResponse.makeError(res);
      } else {
        getCurrencyAsset();
        if (body.isUsingInvestFund) {
          revalidateInvestFund();
        }
        self.createResponse.makeSuccess();
      }
      self.loadingCreateCurrencyAsset = false;

      return true;
    });
    const createCryptoAsset = flow(function* (body: CreateCryptoAssetBody) {
      self.loadingCreateCrypto = true;
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/crypto`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('Error when create crypto asset', res);
        self.createResponse.makeError(res);
      } else {
        getCryptoAsset();
        if (body.isUsingInvestFund) {
          revalidateInvestFund();
        }
        self.createResponse.makeSuccess();
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
        self.createResponse.makeError(res);
      } else {
        getStockAsset();
        if (body.isUsingInvestFund) {
          revalidateInvestFund();
        }
        self.createResponse.makeSuccess();
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
        log('Error when create other asset', res);
        self.createResponse.makeError(res);
      } else {
        getCustomAsset();
        if (body.isUsingInvestFund) {
          revalidateInvestFund();
        }
        self.createResponse.makeSuccess();
      }
    });

    const createBankAsset = flow(function* (body: CreateBankAssetBody) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/bankSaving`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('error when create bank', res);
        self.createResponse.makeError(res);
      } else {
        getBankingAsset();
        if (body.isUsingInvestFund) {
          revalidateInvestFund();
        }
        self.createResponse.makeSuccess();
      }
    });

    const createRealEstateAsset = flow(function* (
      body: CreateRealEstateAssetBody
    ) {
      const res = yield httpRequest.sendPost(
        `${Config.BASE_URL}/portfolio/${self.information.id}/realEstate`,
        body,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('error when create real estate', res);
        self.createResponse.makeError(res);
      } else {
        getRealEstateAsset();
        if (body.isUsingInvestFund) {
          revalidateInvestFund();
        }
        self.createResponse.makeSuccess();
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
        self.deleteResponse.makeError(res);
        log('Error when delete crypto asset', res);
        return false;
      } else {
        getCryptoAsset();
        self.deleteResponse.makeSuccess();
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
        self.deleteResponse.makeError(res);
        log('Error when delete stock asset', res);
        return false;
      } else {
        getStockAsset();
        self.deleteResponse.makeSuccess();
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
        self.deleteResponse.makeError(res);
        log('Error when delete bank asset', res);
        return false;
      } else {
        getBankingAsset();
        self.deleteResponse.makeSuccess();
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
        self.deleteResponse.makeError(res);
        log('Error when delete real estate asset', res);
        return false;
      } else {
        getRealEstateAsset();
        self.deleteResponse.makeSuccess();
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
        self.deleteResponse.makeError(res);
        log('Error when delete cash asset', res);
        return false;
      } else {
        getCurrencyAsset();
        self.deleteResponse.makeSuccess();
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
        self.deleteResponse.makeError(res);
        log('Error when delete custom asset', res);
        return false;
      } else {
        getCustomAsset();
        self.deleteResponse.makeSuccess();
        return true;
      }
    });

    const getPieChart = flow(function* () {
      self.loadingGetPieChart = true;
      const res = yield httpRequest.sendGet(
        `${Config.BASE_URL}/portfolio/${self.information.id}/pieChart`,
        UserStore.user.token
      );
      if (res instanceof HttpError) {
        log('error when get pie chart', res);
      } else {
        self.pieChartInformation = res;
        self.pieChartCount = self.pieChartCount + 1;
      }
      self.loadingGetPieChart = false;
    });

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

    const revalidateInvestFund = () => {
      InvestFundStore.getFund();
    };

    const editPortfolio = flow(function* (body: EditPortfolioBody, id: number) {
      self.loading = true;
      const res = yield httpRequest.sendPut(
        `${Config.BASE_URL}/portfolio/${id}`,
        body,
        UserStore.user.token
      );

      if (res instanceof HttpError) {
        log('Error when edit portfolio', res);
      } else {
        self.information = {
          ...self.information,
          name: body.newName,
          initialCurrency: body.newCurrency,
        };
      }
      PortfolioListStore.getPortfolioList();
      self.loading = false;
    });

    return {
      createOtherAsset,
      editPortfolio,
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
    loadingGetPieChart: false,
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
    createResponse: {
      isError: false,
      isSuccess: false,
      errorMessage: '',
      pending: false,
    },
  });
