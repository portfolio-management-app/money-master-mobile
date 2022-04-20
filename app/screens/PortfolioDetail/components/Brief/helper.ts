import { IPieChartItem } from 'shared/models';
import { randomPieChartColor } from 'utils/random';

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
      name: data[i].assetType,
      value: data[i].sumValue,
      color: randomPieChartColor(),
      legendFontColor: '#000000',
      legendFontSize: 15,
    });
  }
  console.log(res);

  return res;
};
