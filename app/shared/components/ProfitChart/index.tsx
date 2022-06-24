import React from 'react';
import { ScrollView } from 'react-native';
import { IProfit } from 'shared/models';
import { BarChart } from 'react-native-chart-kit';
import { ChartData } from 'react-native-chart-kit/dist/HelperTypes';
import { parseToString } from 'utils/date';

interface IProps {
  chartData: Array<IProfit>;
}
const Component = ({ chartData }: IProps) => {
  const renderData = React.useMemo(() => {
    return buildData(chartData);
  }, [chartData]);
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <BarChart
        data={renderData}
        height={400}
        style={{ marginTop: 10, marginHorizontal: 20 }}
        showValuesOnTopOfBars
        withVerticalLabels
        width={renderData.datasets[0].data.length * 100}
        yAxisLabel={``}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: '#ffff',
          backgroundGradientFrom: '#ffff',
          backgroundGradientTo: '#ffff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 0,0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
          strokeWidth: 5,
        }}
        verticalLabelRotation={30}
      />
    </ScrollView>
  );
};

const buildData = (dataProps: Array<IProfit>) => {
  const data: ChartData = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };

  for (let i = 0; i < dataProps.length; i++) {
    data.labels.push(
      parseToString(new Date(dataProps[i].startTime), { withTime: false })
    );
    data.datasets[0].data.push(Math.round(dataProps[i].amount));
  }

  return data;
};

export const ProfitChart = React.memo(Component);
