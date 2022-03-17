import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native-ui-lib';
import { CandlestickChart, TData } from 'react-native-wagmi-charts';
import { TextContainer } from 'shared/components';
import { IStockInformation, IStockTimeSeries } from 'shared/models';
import { styleProvider } from 'shared/styles';

interface IProps {
  chartData: Array<IStockTimeSeries>;
  stockInfo: IStockInformation;
}

const Component = ({ chartData, stockInfo }: IProps) => {
  const renderData = React.useMemo(() => {
    return buildData(chartData);
  }, [chartData]);
  return (
    <GestureHandlerRootView>
      <CandlestickChart.Provider data={renderData}>
        <CandlestickChart height={300}>
          <CandlestickChart.Candles />
          <CandlestickChart.Crosshair />
        </CandlestickChart>
        <View style={{ paddingHorizontal: 20 }}>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer type="small" bold>
              Open:{' '}
            </TextContainer>
            <CandlestickChart.PriceText type="open" />
            <TextContainer type="small" bold>
              Close:{' '}
            </TextContainer>
            <CandlestickChart.PriceText type="close" />
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer type="small" bold>
              High:{' '}
            </TextContainer>
            <CandlestickChart.PriceText type="high" />
            <TextContainer type="small" bold>
              Low:{' '}
            </TextContainer>
            <CandlestickChart.PriceText type="low" />
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer type="small" bold>
              Exchange timezone:{' '}
            </TextContainer>
            <TextContainer type="small">
              {stockInfo.exchange_timezone}
            </TextContainer>
          </View>
          <View style={[styleProvider.centerHorizontal, { marginTop: 20 }]}>
            <TextContainer type="small" bold>
              Exchange :{' '}
            </TextContainer>
            <TextContainer type="small">{stockInfo.exchange}</TextContainer>
            <TextContainer ml={10} type="small" bold>
              Currency :{' '}
            </TextContainer>
            <TextContainer type="small">{stockInfo.currency}</TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer type="small" bold>
              Date:{' '}
            </TextContainer>
            <CandlestickChart.DatetimeText />
          </View>
        </View>
      </CandlestickChart.Provider>
    </GestureHandlerRootView>
  );
};

const buildData = (dataProps: Array<IStockTimeSeries>) => {
  const res: TData = [];
  for (let i = 0; i < dataProps.length; i++) {
    res.push({
      timestamp: dataProps[i].datetime * 1000,
      open: dataProps[i].open,
      close: dataProps[i].close,
      high: dataProps[i].high,
      low: dataProps[i].low,
    });
  }
  return res;
};

export const Chart = React.memo(Component);
