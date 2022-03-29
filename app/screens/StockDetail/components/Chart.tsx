import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { View } from 'react-native-ui-lib';
import { CandlestickChart, TData } from 'react-native-wagmi-charts';
import { TextContainer } from 'shared/components';
import { APP_CONTENT } from 'shared/constants';
import { IStockInformation, IStockTimeSeries } from 'shared/models';
import { styleProvider } from 'shared/styles';

interface IProps {
  chartData: Array<IStockTimeSeries>;
  stockInfo: IStockInformation;
}
const CONTENT = APP_CONTENT.stockDetail;
const Component = ({ chartData }: IProps) => {
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
              {CONTENT.open}:{' '}
            </TextContainer>
            <CandlestickChart.PriceText type="open" />
            <TextContainer type="small" bold>
              {CONTENT.close}:{' '}
            </TextContainer>
            <CandlestickChart.PriceText type="close" />
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer type="small" bold>
              {CONTENT.high}:{' '}
            </TextContainer>
            <CandlestickChart.PriceText type="high" />
            <TextContainer type="small" bold>
              {CONTENT.low}:{' '}
            </TextContainer>
            <CandlestickChart.PriceText type="low" />
          </View>

          <View style={[styleProvider.centerHorizontal]}>
            <TextContainer type="small" bold>
              {CONTENT.currency}:
            </TextContainer>
            <TextContainer type="small"> USD</TextContainer>
          </View>
          <View style={styleProvider.centerHorizontal}>
            <TextContainer type="small" bold>
              {CONTENT.date}:{' '}
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
