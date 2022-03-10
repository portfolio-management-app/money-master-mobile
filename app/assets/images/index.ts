import { Assets } from 'react-native-ui-lib';

Assets.loadAssetsGroup('icons', {
  google: require('./source/google.png'),
  facebook: require('./source/facebook.png'),
});

Assets.loadAssetsGroup('nodata', {
  searchForData: require('./source/search.png'),
});

export const imageSource = {
  banner: require('./source/greeting.jpg'),
  appIcon: require('./source/app-icon.png'),
  forgetPassword: require('./source/forget-password.jpg'),
  treasureChest: require('./source/treasure-chest.png'),
  growthGraph: require('./source/growth-graph.png'),
  tablet: require('./source/tablet.png'),
  carbonReport: require('./source/carbon_report.png'),
  bitcoin: require('./source/logos_bitcoin.png'),
  gold: require('./source/gold.png'),
  chartLine: require('./source/cil_chart-line.png'),
  bank: require('./source/bank.png'),
  defaultAsset: require('./source/net-worth.png'),
  building: require('./source/building.png'),
  barChart: require('./source/bar-chart.png'),
  cash: require('./source/money.png'),
  ethereum: require('./source/ethereum.png'),
  noData: require('./source/no-data.png'),
  google: require('./source/google.png'),
  facebook: require('./source/facebook.png'),
};
