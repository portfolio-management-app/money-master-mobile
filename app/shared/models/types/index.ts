import { SnapshotOut } from 'mobx-state-tree';
import {
  CurrencyTimeSeries,
  CurrencyInformation,
} from '../currency-information';
import { MetalItem, MetalInformation } from '../metal-information';
import { BankAsset, RealEstateAsset } from '../portfolio-asset';
import { PortfolioInformation } from '../portfolio-information';
import { StockInformation, StockTimeSeries } from '../stock-information';

export type IStockTimeSeries = SnapshotOut<typeof StockTimeSeries>;

export type IStockInformation = SnapshotOut<typeof StockInformation>;

export type IPortfolio = SnapshotOut<typeof PortfolioInformation>;

export type ICurrencyTimeSeries = SnapshotOut<typeof CurrencyTimeSeries>;

export type ICurrencyInformation = SnapshotOut<typeof CurrencyInformation>;

export type IRealEstateAsset = SnapshotOut<typeof RealEstateAsset>;

export type IBankAsset = SnapshotOut<typeof BankAsset>;

export type IMetalItem = SnapshotOut<typeof MetalItem>;

export type IMetalInformation = SnapshotOut<typeof MetalInformation>;
