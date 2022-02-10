import { PlatformView, TextContainer } from 'shared/components';
import React from 'react';
import { StatusBar, StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import {
  colorScheme,
  dimensionProvider,
  iconProvider,
  styleProvider,
} from 'shared/styles';
import { parseToString } from 'utils/date';
import { LineChart } from 'react-native-chart-kit';

export const Wallet = () => {
  return (
    <PlatformView style={styleProvider.body}>
      <StatusBar backgroundColor={colorScheme.bg} barStyle={'dark-content'} />
      <View style={styles.header}>
        <View>
          <TextContainer type="h1" style={{ fontWeight: 'bold' }}>
            Today
          </TextContainer>
          <TextContainer>{parseToString(new Date(), false)}</TextContainer>
        </View>

        <Icon
          size={35}
          tvParallaxProperties={{}}
          name="notifications"
          type={iconProvider.ionicon}
          color={colorScheme.theme}
        />
      </View>

      <LineChart
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={dimensionProvider.width} // from react-native
        height={220}
        yAxisLabel="$"
        yAxisSuffix="k"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </PlatformView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
