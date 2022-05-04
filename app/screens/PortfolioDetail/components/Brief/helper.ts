import { APP_CONTENT } from 'shared/constants';
import { IPieChartItem } from 'shared/models';
import { HorizontalBarChartProps, IPieData } from 'shared/types';
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
  if (checkIsEmpty(data)) {
    return [];
  }

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

export const calculationPercent = (data: Array<IPieData>) => {
  const res: HorizontalBarChartProps['data'] = [];
  let sum = 0;
  for (let i = 0; i < data.length; i++) {
    sum += data[i].value;
  }
  if (sum > 0) {
    for (let i = 0; i < data.length; i++) {
      if (data[i].value > 0) {
        res.push({
          value: data[i].value,
          label: data[i].name,
          percent: Math.round((data[i].value * 100) / sum),
          color: data[i].svg.fill,
        });
      }
    }
  }
  return res;
};

export const buildNewPieChartData = (data: Array<IPieChartItem>) => {
  const res: Array<IPieData> = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].sumValue)
      res.push({
        value: data[i].sumValue,
        svg: {
          fill: randomColor(),
        },
        key: `pie-${i}`,
        name: getLabel(data[i].assetType),
      });
  }
  return res;
};

const randomColor = () =>
  ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7);

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

const checkIsEmpty = (data: Array<IPieChartItem>) => {
  for (let i = 0; i < data.length; i++) {
    if (data[i].sumValue !== 0) return false;
  }
  return true;
};
