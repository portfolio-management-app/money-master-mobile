import { observer } from 'mobx-react-lite';
import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { PlatformView } from 'shared/components';
import { PortfolioDetailStore } from 'shared/stores';
import { dimensionProvider, styleProvider } from 'shared/styles';
import { buildPieChartData } from './helper';

export const Brief = observer(() => {
  const { pieChartInformation, getPieChart } = PortfolioDetailStore;

  const data = buildPieChartData(pieChartInformation);
  React.useEffect(() => {
    getPieChart();
  }, [getPieChart]);
  return (
    <PlatformView style={styleProvider.body}>
      <PieChart
        data={data}
        width={dimensionProvider.width}
        height={220}
        accessor={'value'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        chartConfig={{
          // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        }}
        center={[10, 10]}
      />
    </PlatformView>
  );
});
