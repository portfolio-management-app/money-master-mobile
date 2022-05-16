import { APP_CONTENT } from 'shared/constants';
import { IPieChartItem } from 'shared/models';
import { HorizontalBarChartProps, IPieData } from 'shared/types';

const CONTENT = APP_CONTENT.portfolioDetail.assetPicker;

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
          percent:
            (data[i].value * 100) / sum > 1
              ? Math.floor((data[i].value * 100) / sum)
              : 1,
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
