import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from 'react-native-ui-lib';
import { colorScheme, dimensionProvider } from 'shared/styles';
import { HorizontalBarChartProps } from 'shared/types';
import { formatCurrency } from 'utils/number';
import { TextContainer } from '../TextContainer';

const Component = ({
  data,
  currency,
}: HorizontalBarChartProps & { currency: string }) => {
  return (
    <View style={{ paddingHorizontal: 20 }}>
      {data.map((item) => (
        <View style={[styles.row]} key={item.label}>
          <View
            style={[
              styles.percentBar,
              {
                width: Math.round(
                  (dimensionProvider.width * item.percent) / 100
                ),
              },
            ]}
          ></View>
          <TextContainer>{item.label}</TextContainer>
          <TextContainer>{formatCurrency(item.value, currency)}</TextContainer>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    height: 30,

    marginVertical: 10,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomColor: colorScheme.gray400,
    borderBottomWidth: 0.5,
  },
  percentBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    backgroundColor: colorScheme.gray400,
  },
});

export const HorizontalBarChart = React.memo(Component);
