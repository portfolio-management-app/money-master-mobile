import { NotificationSetting } from './../notification-setting';
import { InvestFundInformation } from './../invest-fund';
import { TransactionItem, InvestFundTransactionItem } from './../transaction';
import { SnapshotIn, SnapshotOut } from 'mobx-state-tree';
import {
  CurrencyTimeSeries,
  CurrencyInformation,
} from '../currency-information';
import { CustomAsset } from '../custom-asset';
import {
  BankAsset,
  RealEstateAsset,
  CryptoAsset,
  StockAsset,
  CashAsset,
} from '../portfolio-asset';
import { PortfolioInformation } from '../portfolio-information';
import { PieChartItem } from '../portfolio-report';
import { StockInformation, StockTimeSeries } from '../stock-information';
import { UserNotification } from '../user-notification';

export type IStockTimeSeries = SnapshotOut<typeof StockTimeSeries>;

export type IStockInformation = SnapshotOut<typeof StockInformation>;

export type IPortfolio = SnapshotOut<typeof PortfolioInformation>;

export type ICurrencyTimeSeries = SnapshotOut<typeof CurrencyTimeSeries>;

export type ICurrencyInformation = SnapshotOut<typeof CurrencyInformation>;

export type IRealEstateAsset = SnapshotOut<typeof RealEstateAsset>;

export type IBankAsset = SnapshotOut<typeof BankAsset>;

export type ICryptoAsset = SnapshotOut<typeof CryptoAsset>;

export type IStockAsset = SnapshotOut<typeof StockAsset>;
export type ICashAsset = SnapshotOut<typeof CashAsset>;

export type ICustomAsset = SnapshotOut<typeof CustomAsset>;

export type IPieChartItem = SnapshotOut<typeof PieChartItem>;

export type ITransactionItem = SnapshotOut<typeof TransactionItem>;

export type IInvestFundInformation = SnapshotOut<typeof InvestFundInformation>;

export type IInvestFundTransactionItem = SnapshotIn<
  typeof InvestFundTransactionItem
>;

export type INotificationSetting = SnapshotOut<typeof NotificationSetting>;

export type IUserNotification = SnapshotIn<typeof UserNotification>;
