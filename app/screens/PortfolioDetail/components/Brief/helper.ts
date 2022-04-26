import { APP_CONTENT } from 'shared/constants';
import { IPieChartItem } from 'shared/models';
import { randomPieChartColor } from 'utils/random';

const CONTENT = APP_CONTENT.portfolioDetail.assetPicker;

export const buildPieChartData = (data: Array<IPieChartItem>) => {
  const res: Array<{
    name: string;
    value: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
  }> = [];
  for (let i = 0; i < data.length; i++) {
    res.push({
      name: getLabel(data[i].assetType),
      value: data[i].sumValue,
      color: randomPieChartColor(),
      legendFontColor: '#000000',
      legendFontSize: 15,
    });
  }

  return res;
};

export const buildBarChartData = (data: Array<IPieChartItem>) => {
  const dataSet: Array<number> = [];
  const labels: Array<string> = [];
  for (let i = 0; i < data.length; i++) {
    dataSet.push(data[i].sumValue);
    labels.push(getLabel(data[i].assetType));
  }
  return { dataSet, labels };
};

const getLabel = (s: string) => {
  switch (s) {
    case 'Cash':
      return CONTENT.cash;
    case 'RealEstate':
      return CONTENT.realEstate;
    case 'BankSavingAsset':
      return CONTENT.banking;
    case 'Crypto':
      return CONTENT.nft;
    case 'Stock':
      return CONTENT.stock;

    default:
      return s;
  }
};
