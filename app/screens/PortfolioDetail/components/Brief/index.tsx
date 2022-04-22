import { observer } from 'mobx-react-lite';
import React from 'react';
import { BarChart, PieChart } from 'react-native-chart-kit';
import { PlatformView } from 'shared/components';
import { PortfolioDetailStore } from 'shared/stores';
import { dimensionProvider, styleProvider } from 'shared/styles';
import { buildBarChartData, buildPieChartData } from './helper';

const chartConfig = {
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#FFFFFF',
  backgroundGradientToOpacity: 1,
  color: (opacity = 1) => `rgba(45, 124, 243, ${opacity})`,
  strokeWidth: 2, // optional, default 3
  barPercentage: 0.5,
  useShadowColorFromDataset: false, // optional
};

export const Brief = observer(() => {
  const { pieChartInformation, getPieChart } = PortfolioDetailStore;

  const data = buildPieChartData(pieChartInformation);
  // const dataBarChart = buildBarChartData(pieChartInformation);
  React.useEffect(() => {
    getPieChart();
  }, [getPieChart]);
  return (
    <PlatformView style={styleProvider.body}>
      <PieChart
        data={data}
        width={dimensionProvider.width}
        height={200}
        accessor={'value'}
        backgroundColor={'transparent'}
        paddingLeft={'0'}
        chartConfig={{
          // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        center={[0, 0]}
      />
      {/* <BarChart
        data={{
          labels: dataBarChart.labels,
          datasets: [{ data: dataBarChart.dataSet }],
        }}
        width={dimensionProvider.width}
        height={300}
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      /> */}
    </PlatformView>
  );
});
