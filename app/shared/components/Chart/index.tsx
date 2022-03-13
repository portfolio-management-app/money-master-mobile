import React from 'react';
import { View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { LineChart, TLineChartDataProp } from 'react-native-wagmi-charts';
import { colorScheme, fontProvider } from 'shared/styles';

interface IProps {
  chartData: Array<Array<number>>;
}
const Component = ({ chartData }: IProps) => {
  const renderData = React.useMemo(() => {
    return buildData(chartData);
  }, [chartData]);

  return (
    <GestureHandlerRootView>
      <LineChart.Provider data={renderData}>
        <LineChart height={300}>
          <LineChart.Path width={2} color={colorScheme.red500}>
            <LineChart.Gradient />
          </LineChart.Path>
          <LineChart.CursorCrosshair>
            <LineChart.Tooltip
              textStyle={{
                backgroundColor: colorScheme.black200,
                borderRadius: 4,
                color: colorScheme.white,
                fontSize: 18,
                padding: 4,
              }}
            />
          </LineChart.CursorCrosshair>
        </LineChart>

        <View style={{ marginLeft: 10 }}>
          <LineChart.PriceText
            style={{
              fontFamily: fontProvider.openSans,
              fontSize: 18,
              color: colorScheme.black200,
              fontWeight: 'bold',
            }}
          />
          <LineChart.DatetimeText
            style={{
              fontFamily: fontProvider.openSans,
              fontSize: 16,
              color: colorScheme.black200,
            }}
          />
        </View>
      </LineChart.Provider>
    </GestureHandlerRootView>
  );
};

const buildData = (dataProps: Array<Array<number>>) => {
  const data: TLineChartDataProp = [];

  for (let i = 0; i < dataProps.length; i++) {
    data.push({ timestamp: dataProps[i][0], value: dataProps[i][1] });
  }

  return data;
};

export const Chart = React.memo(Component);
