import React from 'react';
import { PieChart } from 'react-native-chart-kit';
import { PlatformView } from 'shared/components';
import { colorScheme, dimensionProvider, styleProvider } from 'shared/styles';

const data = [
  {
    name: 'Seoul',
    population: 21500000,
    color: 'rgba(131, 167, 234, 1)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Toronto',
    population: 2800000,
    color: '#F00',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Beijing',
    population: 527612,
    color: 'red',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'New York',
    population: 8538000,
    color: colorScheme.black200,
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
  {
    name: 'Moscow',
    population: 11920000,
    color: 'rgb(0, 0, 255)',
    legendFontColor: '#7F7F7F',
    legendFontSize: 15,
  },
];

export const Brief = () => {
  console.log(data);
  return (
    <PlatformView style={styleProvider.body}>
      <PieChart
        data={data}
        width={dimensionProvider.width}
        height={220}
        accessor={'population'}
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
};
