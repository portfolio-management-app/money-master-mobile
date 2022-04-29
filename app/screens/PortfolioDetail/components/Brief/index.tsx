import { observer } from 'mobx-react-lite';
import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { View } from 'react-native-ui-lib';
import { Empty, PlatformView } from 'shared/components';
import { PortfolioDetailStore } from 'shared/stores';
import { dimensionProvider, styleProvider } from 'shared/styles';
import { buildPieChartData } from './helper';

export const Brief = observer(() => {
  const { pieChartInformation, getPieChart } = PortfolioDetailStore;

  const data = buildPieChartData(pieChartInformation);
  // const dataBarChart = buildBarChartData(pieChartInformation);
  React.useEffect(() => {
    getPieChart();
  }, [getPieChart]);

  return (
    <PlatformView style={styleProvider.body}>
      {data.length ? (
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
      ) : (
        <View
          flex
          style={[styleProvider.centerVertical, { justifyContent: 'center' }]}
        >
          <Empty />
        </View>
      )}
    </PlatformView>
  );
});
