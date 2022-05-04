import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { TextContainer } from 'shared/components';
import { styleProvider } from 'shared/styles';
import { HorizontalBarChartProps, IPieData } from 'shared/types';

interface IProps {
  data: Array<IPieData>;
  renderLabels: HorizontalBarChartProps['data'];
}
export const PieChartAsset = observer(({ data, renderLabels }: IProps) => {
  return (
    <View>
      <PieChart
        style={{ height: 200 }}
        data={data}
        innerRadius={20}
        outerRadius={55}
        labelRadius={80}
      ></PieChart>
      <View style={styles.container}>
        {renderLabels.map((item) => (
          <View
            style={[
              styleProvider.centerHorizontal,
              { paddingHorizontal: 10, paddingVertical: 10 },
            ]}
            key={item.label}
          >
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <TextContainer ml={10} type="small">
              {item.label} ({item.percent}%)
            </TextContainer>
          </View>
        ))}
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  dot: {
    width: 20,
    height: 20,
    borderRadius: 20,
  },
  container: {
    paddingHorizontal: 10,
  },
});
