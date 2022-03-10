import React from 'react';
import { LineChart } from 'react-native-chart-kit';
import { colorScheme, dimensionProvider } from 'shared/styles';
import { parseToString } from 'utils/date';

interface IProps {
  data: Array<Array<number>>;
  currency: string;
}
const Component = ({ data }: IProps) => {
  const renderData = React.useMemo(() => {
    return buildData(data);
  }, [data]);

  return (
    <LineChart
      style={{ paddingRight: 0 }}
      data={{
        labels: renderData.labels,
        datasets: [
          {
            data: renderData.data,
          },
        ],
      }}
      withVerticalLabels={false}
      withHorizontalLines={false}
      withVerticalLines={false}
      withHorizontalLabels={false}
      withInnerLines={false}
      withDots={false}
      width={dimensionProvider.width} // from react-native
      height={300}
      yAxisInterval={1} // optional, defaults to 1
      chartConfig={{
        backgroundColor: colorScheme.white,
        backgroundGradientFrom: colorScheme.bg,
        backgroundGradientTo: colorScheme.bg,
        decimalPlaces: 2,
        color: () => colorScheme.red500,
        labelColor: () => colorScheme.black200,
        propsForDots: {
          r: '6',
          strokeWidth: '2',
          stroke: colorScheme.red500,
        },
      }}
      bezier
    />
  );
};

const buildData = (dataProps: Array<Array<number>>) => {
  if (dataProps.length === 0) {
    return {
      labels: [],
      data: [1, 2, 3, 4, 5],
    };
  }

  const data: Array<number> = [];
  const labels: Array<string> = [];

  for (let i = 0; i < dataProps.length; i++) {
    labels.push(
      parseToString(new Date(dataProps[i][0]), {
        withYear: false,
      })
    );
    data.push(dataProps[i][1]);
  }

  return {
    data,
    labels,
  };
};

export const Chart = React.memo(Component);
