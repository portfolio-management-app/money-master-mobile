import { SnapshotOut } from 'mobx-state-tree';
import { StockInformation, StockTimeSeries } from '../stock-information';

export type IStockTimeSeries = SnapshotOut<typeof StockTimeSeries>;

export type IStockInformation = SnapshotOut<typeof StockInformation>;
